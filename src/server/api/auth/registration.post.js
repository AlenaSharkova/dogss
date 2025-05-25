// Request OTP (регистрация/логин)
import {generateOTP, generateRandomToken} from '../../utils/generate.js'
import {sendOTPByEmail} from '../../services/mail.service'

//const Users = UsersModel(sequelize)
export default defineEventHandler(async (event) => {

    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const Otp = event.context.Otp;
    console.log('user model', Users)
    console.log('Otp model', Otp)
    if (!Users || !Otp || !sequelize) {
        console.error( 'Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка сервера',
            serviceMessage: 'Database connection error',
        });
    }
    const { email } = await readBody(event)
    let otp, token
    let user = await Users.findOne({ where: { email } });
    console.log('user', user)
    if (user) {
        throw createError({
            statusCode: 409,
            statusMessage: 'Пользователь существует',
        })
    }
    try {
        otp = generateOTP();
        token = generateRandomToken();
    }
    catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: '',
            serviceMessage: 'ошибка генерации opt | token',
            error: error,
        })
    }

    // Отправляем OTP
    try {
        if (email) {
            console.log('sendOTPByEmail')
            await sendOTPByEmail(email, otp, token);
            //return { message: 'OTP sent successfully' }
        } else {
            createError({
                statusCode: 400,
                statusMessage: 'Не введён email in params',
                serviceMessage: 'Не введён email',
            })
        }

    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Не удалось запросить код подтверждения',
            error: error,
        })
    }

    try {
        console.log('user otp', otp, token)

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Срок действия 5 минут
        console.log('expiresAt', expiresAt)

        // Удаляем предыдущий OTP, если он есть
        await Otp.destroy({ where: { userId: user.id } });

        // Сохраняем OTP в базе данных
        const otpNew = await Otp.create({
            userId: user.id,
            otp: otp,
            token: token,
            expiresAt: expiresAt,
        });
        console.log('otpNew', otpNew)
    }
    catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Не удалось запросить код подтверждения',
            serviceMessage: 'Ошибка сохранение | удаления  otp',
            error: error,
        })
    }
})