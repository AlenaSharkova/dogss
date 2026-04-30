import jwt from "jsonwebtoken";
import {UserFactory} from "~/server/class/User.class";
import {OtpFactory} from "~/server/class/Otp.class";
import {queryOtp, queryTokenLink} from "~/server/struct/OtpStruct";
import {UserBDFirstItemStruct} from "~/server/struct/UserStruct";

export default defineEventHandler(async (event) => {
    try {

        const query: queryTokenLink | queryOtp = getQuery(event)
        const userInstance = UserFactory.createFromContext(event);
        const otpInstance = OtpFactory.createFromContext(event);

        const statusMessageServer = 'Ошибка сервера, попробуйте позже'


        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            console.error('Ошибка: Переменная окружения JWT_SECRET_KEY не определена!');
            throw createError({
                statusCode: 500,
                message: 'Переменная окружения JWT_SECRET_KEY не определена!',
                statusMessage: statusMessageServer
            });
        }
        let user: any = null
        if ("tokenLink" in query && query.tokenLink ) {
            let OtpWithToken = await otpInstance.getByTokenLink(query.tokenLink)

            await userInstance.getById(OtpWithToken.userId)

        }
        else if ("email" in query && query.email && query.otp) {
            user = await userInstance.getByEmail(query.email);
            if (!user) {
                throw createError({
                    statusCode: 401,
                    message: 'User not found',
                    statusMessage: 'Пользователь не найден'
                });
            }
            await otpInstance.getByToOtpAndUserId({
                otp: query.otp,
                userId: user.id,
            })

            await otpInstance.destroy(user.id)
        }
        // Аутентификация успешна!  Создаем и возвращаем JWT токен
        const token = jwt.sign({ userId: user?.id }, secretKey, { expiresIn: '30d' });
        if(user && user.status === 'unconfirmed') {
            user.status = 'active';
            await user.update({ status: 'active' });
        }
        if(!token) {
            throw createError({
                statusCode: 401,
                message: 'Токен не определён',
                statusMessage: 'Токен не определён'
            });
        }
        return {
            token: token
        }
    } catch (error) {
        console.error(error);
        throw error
    }


})