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
            statusMessage: 'Database connection error',
        });
    }
    const { email } = await readBody(event) // Принимаем email или номер телефона

    try {
        let user = await Users.findOne({ where: { email } });
        console.log('user', user)
        if (!user) {
            // Если пользователя нет, создаем его
            user = await Users.create({ email });
            console.log('user 2', user)
        }

        const otp = generateOTP();
        const token = generateRandomToken();
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

        // Отправляем OTP
        try {
            if (email) {
                console.log('sendOTPByEmail')
                await sendOTPByEmail(email, otp, token);
                console.log('sendOTPByEmail 2')
                return { message: 'OTP sent successfully' }
            } else {
                createError({
                    statusCode: 400,
                    statusMessage: 'Email or phone number is required',
                    //statusMessage:  error,
                })
            }
        } catch (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Не удалось запросить OTP',
                error: error,
            })
        }


    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to request OTP',
            error: error,
        })
    }
})