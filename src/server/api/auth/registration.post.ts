import {UserFactory} from "~/server/class/User.class.ts";
import {UserBDFirstItemStruct, UserCreateItemStruct} from "~/server/struct/UserStruct";
import {OtpFactory} from "~/server/class/Otp.class";

export default defineEventHandler(async (event) => {
    try {

        const userInstance = UserFactory.createFromContext(event);
        const otpInstance = OtpFactory.createFromContext(event);


        const body = await readBody(event) as UserCreateItemStruct
        const email = body.email
        let userCreated: UserBDFirstItemStruct | null = null
        let user: UserBDFirstItemStruct = await userInstance.getByEmail(email)

        if (user) {
            throw createError({
                statusCode: 409,
                message: 'Пользователь существует',
                statusMessage: 'Пользователь существует',
                data: {
                    code: 'err-user-has',
                    userStatus: user.status
                    //1111@ddd.ddd
                },
            })
        }


        otpInstance.generateCode()
        await otpInstance.sendCodeByEmail(email)
        userCreated = await userInstance.create(body);


        if (userCreated?.id) {
            // Удаляем предыдущий OTP, если он есть
            await otpInstance.destroy(userCreated.id)
            // Создаём OTP
            await otpInstance.create(userCreated.id)
        }

        return {message: 'Пользователь записан в базу данных, OTP успешно отправлен'}
    } catch(error) {
        throw error
    }

})