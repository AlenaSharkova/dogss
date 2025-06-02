// Request OTP (регистрация/логин)
import {generateOTP, generateRandomToken} from '../../utils/generate.js'
import {sendOTPByEmail} from '../../services/mail.service'

//const Users = UsersModel(sequelize)
export default defineEventHandler(async (event) => {

    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const Otp = event.context.Otp;
    const statusMessage = 'Ошибка регистрации, попробуйте, ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!Users || !Otp || !sequelize) {
        console.error( 'Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer,
        });
    }
    const body = await readBody(event)
    body.status = 'unconfirmed'
    const email = body.email
    let userItemCreatedResult = {}

    let user = await Users.findOne({ where: { email } });
    console.log('user', user)
    if (user) {
        throw createError({
            statusCode: 409,
            message: 'Пользователь существует',
            statusMessage: 'Пользователь существует',
        })
    } else {
        try {
            userItemCreatedResult = await Users.create(body);
        } catch (error) {
            console.error('Ошибка сохранения данных', error)
            throw createError({
                statusCode: 500,
                message: 'Ошибка сохранения данных',
                statusMessage: 'Ошибка сохранения данных',
            })
        }
    }

    let otp, token
    try {
        otp = generateOTP();
        token = generateRandomToken();
    }
    catch (error) {
        throw createError({
            statusCode: 500,
            message: 'ошибка генерации opt | token',
            statusMessage,
        })
    }

    // Отправляем OTP
    try {
        if (email) {
            await sendOTPByEmail(email, otp, token);
        } else {
            throw createError({
                statusCode: 400,
                message: 'Не введён email in params',
                statusMessage: 'Не введён email',
            })
        }

    } catch (error) {
        throw error
    }

    try {
        console.log('user otp', otp, token)

        const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // Срок действия 3 минут
        console.log('expiresAt', expiresAt)

        // Удаляем предыдущий OTP, если он есть
        await Otp.destroy({ where: { userId: userItemCreatedResult.id } });

        // Сохраняем OTP в базе данных
        const otpNew = await Otp.create({
            userId: userItemCreatedResult.id,
            otp: otp,
            token: token,
            expiresAt: expiresAt,
        });
        return { message: 'Пользователь записан в базу данных, OTP успешно отправлен' }
    }
    catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Ошибка сохранение | удаления  otp',
            statusMessage: 'Не удалось запросить код подтверждения',
        })
    }
})