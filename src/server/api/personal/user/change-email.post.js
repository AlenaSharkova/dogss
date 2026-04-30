import {generateOTP, generateRandomToken} from '../../../utils/generate.js'
import {sendOTPByEmail} from '../../../services/mail.service.js'
import {getUserAuth} from "~/server/services/auth.service.js";

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')

    const tokenAuth = authHeader && authHeader.split(' ')[1];// Bearer <token>

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
    const { new_email } = await readBody(event) // Принимаем email
    let user
    try {
        await getUserAuth(tokenAuth, Users)
            .then(res => user = res)
            .catch(err => {
                throw err
            })
    } catch (error) {
        console.error("Ошибка при верификации токена:", error);
        throw error
    }
    try {
        if (!new_email) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Не введён email in params',
                message: 'Не введён email',
            })
        }
        let userConfirmEmail = await Users.findOne({ where: { email: new_email } });
        if(userConfirmEmail) {
            throw createError({
                statusCode: 409,
                statusMessage: 'Пользователь уже существует',
                message: 'Пользователь уже существует',
            })
        }
    } catch (error) {
        console.error("Ошибка:", error);
        throw error
    }
    let otp, tokenLink
    try {
        otp = generateOTP();
        tokenLink = generateRandomToken();
    }
    catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage,
            message: 'ошибка генерации opt | tokenAuth',
        })
    }
    // Отправляем OTP
    try {
        user.new_email = new_email;
        await user.save();
        await sendOTPByEmail(new_email, otp, tokenLink);
    } catch (error) {
        throw error
    }
    try {
        const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // Срок действия 3 минут
        console.log('expiresAt', expiresAt, otp)
        // Удаляем предыдущую запись с OTP и tokenLink, если есть
        await Otp.destroy({where: {userId: user.id, is_change_email: true}});

        // Сохраняем OTP в базе данных
        const otpNew = await Otp.create({
            userId: user.id,
            otp: otp,
            is_change_email: true,
            token: tokenLink,
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