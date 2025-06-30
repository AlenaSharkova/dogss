import {generateOTP, generateRandomToken} from '../../utils/generate.js'
import {sendOTPByEmail} from '../../services/mail.service'

export default defineEventHandler(async (event) => {

    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const Otp = event.context.Otp;
    const statusMessage = 'Ошибка входа, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!Users || !Otp || !sequelize) {
        console.error( 'Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer,
        });
    }
    const { email } = await readBody(event) // Принимаем email или номер телефона
    const { isConfirm } = getQuery(event)

    let user = await Users.findOne({ where: { email } });
    console.log('user', user)
    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Пользователь не зарегистрирован на сервисе',
            statusMessage: 'Пользователь не зарегистрирован на сервисе',
        })
    } else if (user.status === 'unconfirmed' && !isConfirm) {
        return {
            userStatus: user.status,
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
            statusMessage,
            message: 'ошибка генерации opt | token',
        })
    }
    // Отправляем OTP
    try {
        if (email) {
            await sendOTPByEmail(email, otp, token);
        } else {
            throw createError({
                statusCode: 400,
                statusMessage: 'Не введён email in params',
                message: 'Не введён email',
            })
        }
    } catch (error) {
        throw error
    }
    try {
        const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // Срок действия 3 минут
        console.log('expiresAt', expiresAt, otp)
        // Удаляем предыдущую запись с OTP и token, если есть
        await Otp.destroy({where: {userId: user.id}});

        // Сохраняем OTP в базе данных
        const otpNew = await Otp.create({
            userId: user.id,
            otp: otp,
            token: token,
            expiresAt: expiresAt,
        });
        return { message: 'OTP успешно отправлен', otpNew }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Не удалось запросить код подтверждения',
            message: 'Ошибка сохранение | удаления  otp',
        })
    }
})