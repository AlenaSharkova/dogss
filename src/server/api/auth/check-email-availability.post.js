import {generateOTP, generateRandomToken} from '../../utils/generate.js'
import {sendOTPByEmail} from '../../services/mail.service'

export default defineEventHandler(async (event) => {

    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const statusMessage = 'Ошибка входа, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!Users || !sequelize) {
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer,
        });
    }
    const { email } = await readBody(event)
    try {
        let user = await Users.findOne({ where: { email } });
        return {
            isAvailability: !!user,
            userStatus: user?.status
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'ошибка запроса к базе данных',
        })
    }
})