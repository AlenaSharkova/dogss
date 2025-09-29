
import { Op} from "sequelize";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const Otp = event.context.Otp;
    const statusMessage = 'Ошибка верификации, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!Users || !Otp || !sequelize) {
        console.error( 'Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer
        });
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        console.error('Ошибка: Переменная окружения JWT_SECRET_KEY не определена!');
        throw createError({
            statusCode: 500,
            message: 'Переменная окружения JWT_SECRET_KEY не определена!',
            statusMessage: statusMessageServer
        });
    }
    try {
        let user = null
        if (query?.code) {
            let OtpWithToken = await Otp.findOne({where: {token: query?.code}});
            if(!OtpWithToken) {
                throw createError({
                    statusCode: 401,
                    message: 'Token not found',
                });
            }
            if (OtpWithToken.expiresAt < new Date()) {
                throw createError({
                    statusCode: 410,
                    message: 'Срок действия OTP истек.',
                });
            }
            user = await Users.findOne({where: {id: OtpWithToken.userId}});
            if (!user) {
                throw createError({
                    statusCode: 404,
                    message: 'User not found',
                });
            }
        }
        else if (query?.email && query?.otp) {
            user = await Users.findOne({where: {email: query.email}});
            if (!user) {
                throw createError({
                    statusCode: 401,
                    message: 'User not found',
                    statusMessage: 'Пользователь не найден'
                });
            }
            let OtpWithOtpToken = await Otp.findOne(
                {
                    where: {
                        userId: user.id,
                        otp: query.otp,
                        expiresAt: {[Op.gt]: new Date()}
                    }
                }
            );

            if (!OtpWithOtpToken) {
                throw createError({
                    statusCode: 400,
                    message: 'Invalid OTP',
                    statusMessage: 'Неверно введённый код'
                });
            }
            await Otp.destroy(
                {
                    where: {
                        userId: user.id,
                        otp: query.otp,
                        expiresAt: {[Op.gt]: new Date()}
                    }
                }
            );
        }
        // Аутентификация успешна!  Создаем и возвращаем JWT токен
        const token = jwt.sign({ userId: user?.id }, secretKey, { expiresIn: '30d' });
        if(user && user.status === 'unconfirmed') {
            user.status = 'active'
            await user.save();
        }
        return {
            token: token
        }
    } catch (error) {
        console.error(error);
        throw error
    }


})