import {getUserAuth} from "~/server/services/auth.service";
import {sendAdModerationToTgAdmin} from "~/server/services/telegram.service";
import {IUploadImageBD, IUploadImageBody, IUploadImageInBase} from "~/server/struct/UploadFileStruct";

export default defineEventHandler(async (event)=>
{
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const body = await readBody(event)

    const AdList = event.context.AdList;
    const Users = event.context.Users;
    const AdExportRegions = event.context.AdExportRegions;
    const UploadedFile = event.context.UploadedFile;

    let adItemCreateResult
    //TODO: валидация

    try {
        let user
        await getUserAuth(token, Users)
            .then(res => user = res)
            .catch(err => {
                throw err
            })

        if (!user) {
            console.error(`Пользователь с ID ${body.owner} не найден!`);
            throw createError({
                statusCode: 500,
                message: `Пользователь с ID ${body.owner} не найден!`,
            });
        }

        if (!body.photos) {
            throw createError({
                statusCode: 400,
                message: `Получены не все данные`,
            });
        }
        let photoBase: IUploadImageBD[] = []
        for (const photo of body.photos) {
            photoBase.push(await sendPhoto(photo))
        }
        body.photos = photoBase.map(item => item.id);
        adItemCreateResult = await AdList.create(body);
        if (body.is_export && body.regionsExport && body.regionsExport.length ) {
            for (const regionId of body.regionsExport) {
                await AdExportRegions.create({
                    ad_id: adItemCreateResult.id,
                    region_id: regionId
                });
            }
        }

        sendAdModerationToTgAdmin(event.context.TelegramBotMain, adItemCreateResult.id)

        return adItemCreateResult
    }
    catch (error) {
        console.log('Ошибка при создании объявления ', error)
        throw createError({
            statusCode: 400,
            message: JSON.stringify(error),
            statusMessage: 'Ошибка при создании объявления',
        })
    }

    async function sendPhoto (photo: IUploadImageBody) {
        return await UploadedFile.create({
            url: photo.url,
            typeFile: 'image',
            purpose: 'ad',
            owner: body.owner,
            coordinates: photo.coordinates,
            positionBanner: photo.positionBanner
        });
    }
})