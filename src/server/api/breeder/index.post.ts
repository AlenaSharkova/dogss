import {formattedBreeders, formattedDogsShort} from "~/server/utils/formattedRequest";
import {IUploadImageBD, IUploadImageBody} from "~/server/struct/UploadFileStruct";
import {getUserAuth} from "~/server/services/auth.service";

export default defineEventHandler(async (event) => {
    const sequelize = event.context.sequelize;
    const body = await readBody(event)

    const statusMessage = 'Ошибка входа, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    const AdList = event.context.AdList;
    const Dogs = event.context.Dogs;
    const Breeders = event.context.Breeders;
    const Breeds = event.context.Breeds;
    const UploadedFile = event.context.UploadedFile;
    const Users = event.context.Users;

    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>
    let user: any


    try {
        if (!AdList || !Breeders || !Dogs || !Breeds || !Users || !UploadedFile || !sequelize) {
            console.error('Model or sequelize is not available in the context');
            throw createError({
                statusCode: 500,
                message: 'Database connection error',
                statusMessage: statusMessageServer
            });
        }
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
        //Dogs.create(body.my_dogs);

        let photoBasePhotoGallery: IUploadImageBD[] = []
        if(body.photo_banner) {
            await sendPhoto( body.photo_banner, 'breeder_banner')
        }
        for (const photo of body.photos_gallery) {
            photoBasePhotoGallery.push(await sendPhoto(photo, 'breeder_gallery'))
        }
        const res = await Breeders.create({
            name: body.name,
            text_about: body.text_about,
            my_dogs: body.my_dogs.map(item => item.id),
            user_id: user.id
        })
        return res
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: JSON.stringify(error),
            statusMessage: 'Ошибка при создании объявления',
        })
        throw error;
    }

    async function sendPhoto(photo: IUploadImageBody, purpose: string) {
        return await UploadedFile.create({
            url: photo.url,
            typeFile: 'image',
            purpose: purpose,
            owner: user.id,
            coordinates: photo.coordinates,
            positionBanner: photo.positionBanner
        });
    }

})