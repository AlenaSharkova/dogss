import {UserFactory} from "~/server/class/User.class";
import {getUserAuth} from "~/server/services/auth.service";
import {ref} from "vue";
import {UserBDItemStruct} from "~/server/struct/UserStruct";
import {createError} from "h3";

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const userInstance = UserFactory.createFromContext(event);
    const Users = event.context.Users;
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    let user = ref<UserBDItemStruct | null>(null)

    if (!Users) {  // Исправлено: добавлены логические операторы OR
        console.error('Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer,
        });
    }
    try {
        const include = [
            {
                model: this.models.GeoCity,
                as: 'LocationUserCity',
            },
            {
                model: this.models.GeoRegions,
                as: 'LocationUserRegion',
            },
            {
                model: this.models.Breeders,
                as: 'MyBreeder',
                required: false
            }
        ]
        await getUserAuth(token, Users, )
            .then(res => user.value = res)
            .catch(err => {
                throw err
            })
        if(!user.value) {
            throw createError({
                statusCode: 401,
                message: 'Пользователь не найден',
                statusMessage: 'Пользователь не найден'
            });
        }
        return formattedUserAuth(user.value) // Возвращаем пользователя, если все проверки пройдены
    } catch (error) {
        throw error
    }
});