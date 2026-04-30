import {generateOTP, generateRandomToken} from '../../utils/generate.js'
import {sendOTPByEmail} from '../../services/mail.service'
import {UserFactory} from "~/server/class/User.class";
import {OtpFactory} from "~/server/class/Otp.class";
import {UserBDFirstItemStruct} from "~/server/struct/UserStruct";

export default defineEventHandler(async (event) => {
    try {

        const userInstance = UserFactory.createFromContext(event);
        const otpInstance = OtpFactory.createFromContext(event);

        const { email } = await readBody(event) // Принимаем email или номер телефона
        const { isConfirm } = getQuery(event)

        let user: UserBDFirstItemStruct = await userInstance.getByEmail(email)

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
        otpInstance.generateCode()
        await otpInstance.sendCodeByEmail(email)
        if(user?.id) {
            // Удаляем предыдущий OTP, если он есть
            await otpInstance.destroy(user.id)
            // Создаём OTP
            await otpInstance.create(user.id)
        }
        return { message: 'OTP успешно отправлен', otp: otpInstance.otp }

    } catch (error) {
        throw error
    }
})