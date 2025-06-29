// Request OTP (регистрация/логин)
import {generateOTP, generateRandomToken} from '../../utils/generate.js'
import {sendOTPByEmail} from '../../services/mail.service'

//const Users = UsersModel(sequelize)
export default defineEventHandler(async (event) => {

    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const Otp = event.context.Otp;
    const statusMessage = 'Ошибка запроса кода, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера попробуйте позже'

    if (!Users || !Otp || !sequelize) {
        console.error( 'Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer,
        });
    }
    const { email } = await readBody(event) // Принимаем email или номер телефона

    try {
        let user = await Users.findOne({ where: { email } });
        console.log('user', user)
        if (!user) {
            // Если пользователя нет, создаем его
            user = await Users.create({ email });
        }

        const otp = generateOTP();
        const token = generateRandomToken();

        const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // Срок действия 3 минут

        // Удаляем предыдущий OTP, если он есть
        await Otp.destroy({ where: { userId: user.id } });

        // Сохраняем OTP в базе данных
        const otpNew = await Otp.create({
            userId: user.id,
            otp: otp,
            token: token,
            expiresAt: expiresAt,
        });

        // Отправляем OTP
        try {
            if (email) {
                console.log('sendOTPByEmail')
                await sendOTPByEmail(email, otp, token);
                console.log('sendOTPByEmail 2')
                return { message: 'OTP успешно отправлен на почту' }
            } else {
                throw createError({
                    statusCode: 400,
                    message: 'Email is required',
                    statusMessage,
                })
            }
        } catch (error) {
            throw error
        }


    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 500,
            message: 'Failed to request OTP',
            statusMessage: 'Failed to request OTP',
        })
    }
})