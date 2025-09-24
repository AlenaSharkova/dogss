import {getUserAuth} from "~/server/services/auth.service";
import {ref} from "vue";
import {UserBDItemStruct} from "~/server/struct/UserStruct";
import {adminEmail} from "~/server/data/access-data";

export default defineEventHandler(async (event)=>
{
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const body = await readBody(event)

    const AdList = event.context.AdList;
    const Users = event.context.Users;
    const AdExportRegions = event.context.AdExportRegions;

    let user = ref<UserBDItemStruct | null>(null)

    let adItemChangeResult
    //TODO: валидация

    try {
        await getUserAuth(token, Users)
            .then(res => user.value = res)
            .catch(err => {
                throw err
            })

        if (!user.value) {
            console.error(`Пользователь с ID ${body.owner} не найден!`);
            throw createError({
                statusCode: 500,
                message: `Пользователь с ID ${body.owner} не найден!`,
            });
        }
        if(user.value.email !== adminEmail) {
            return createError({
                statusCode: 401,
                message: 'Нет прав доступа к ресурсам',
                statusMessage: 'Нет прав доступа к ресурсам'
            });
        }
        if(!body.id) {
            throw createError({
                statusCode: 500,
                message: `Не хватает параметра id объявления!`,
            });
        }
        adItemChangeResult = await AdList.findOne({
            where: {
                id: body.id,
            },
        })
        console.log('adItemChangeResult000', adItemChangeResult)
        if(!adItemChangeResult) {
            throw createError({
                statusCode: 500,
                message: `Объявление не найдено!`,
            });
        }

        if(body.new_status) {
            if (body.new_status === 'active' && adItemChangeResult.status === 'moderation' ) {
                adItemChangeResult.status = body.new_status
                adItemChangeResult.CreatedAt = new Date();
            }
            if (body.new_status === 'blocked' && adItemChangeResult.status === 'moderation' ) {
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
            message: JSON.stringify(error),
            statusMessage: 'Ошибка при редактировании объявления',
        })

    }
})