import {getUserAuth} from "~/server/services/auth.service";

export default defineEventHandler(async (event)=>
{
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const body = await readBody(event)

    const AdList = event.context.AdList;
    const Users = event.context.Users;
    const AdExportRegions = event.context.AdExportRegions;

    let adItemChangeResult
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
        console.log('body.id000', body)
        if(!body.id) {
            throw createError({
                statusCode: 500,
                message: `Не хватает параметра id объявления!`,
            });
        }
        adItemChangeResult = await AdList.findOne({
            where: {
                id: body.id,
                owner: user.id,
            },
        })
        console.log('adItemChangeResult000', adItemChangeResult)
        if(!adItemChangeResult) {
            throw createError({
                statusCode: 500,
                message: `Объявление не найдено!`,
            });
        }

        if (body.date.is_export && body.date.regionsExport && body.date.regionsExport.length ) {
            for (const regionId of body.regionsExport) {
                await AdExportRegions.create({
                    ad_id: adItemChangeResult.id,
                    region_id: regionId
                });
            }

        }
        //TODO:  при изменении body.date.is_export, удалять
        for(let idBody in body.date) {
            adItemChangeResult[idBody] = body.date[idBody]
        }
        if(body.new_status) {
            if (body.new_status === 'active' && adItemChangeResult.status === 'draft' ) {
                adItemChangeResult.status = body.new_status
                adItemChangeResult.CreatedAt = new Date();
            }
            if (body.new_status === 'archive' && adItemChangeResult.status === 'active' ) {
                adItemChangeResult.status = body.new_status
            }
        }

        await adItemChangeResult.save();

        return {
            message: 'Объявление успешно отредактировано',
            success: true,
            adItemChangeResult
        }
        //return adItemChangeResult
    }
    catch (error) {
        console.log('Ошибка при редактировании объявления ', error )
        throw createError({
            statusCode: 400,
            message: error || 'Неизвестная ошибка',
            statusMessage: 'Ошибка при редактировании объявления',
        })

    }
})