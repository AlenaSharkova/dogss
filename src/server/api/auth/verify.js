
import { Op} from "sequelize";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const Otp = event.context.Otp;
    if (!Users || !Otp || !sequelize) {
        console.error( 'Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            statusMessage: 'Database connection error',
        });
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        console.error('Ошибка: Переменная окружения JWT_SECRET_KEY не определена!');
        throw createError({
            statusCode: 500,
            statusMessage: 'Переменная окружения JWT_SECRET_KEY не определена!',
        });
    }
    try {
        let user = null
        if (query?.code) {
            let OtpWithToken = await Otp.findOne({where: {token: query?.code}});
            if(!OtpWithToken) {
                createError({
                    statusCode: 404,
                    statusMessage: 'Token not found',
                });
            }
            if (OtpWithToken.expiresAt < new Date()) {
                createError({
                    statusCode: 410,
                    statusMessage: 'Срок действия OTP истек.',
                });
            }
            user = await Users.findOne({where: {id: OtpWithToken.userId}});
            if (!user) {
                createError({
                    statusCode: 404,
                    statusMessage: 'User not found',
                });
            }
        }
        else if (query?.email && query?.otp) {
            user = await Users.findOne({where: {email: query.email}});
            if (!user) {
                createError({
                    statusCode: 404,
                    statusMessage: 'User not found',
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
                createError({
                    statusCode: 400,
                    statusMessage: 'Invalid OTP',
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
        const token = jwt.sign({ userId: user?.id }, secretKey, { expiresIn: '1h' });
        return {
            token: token
        }
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to verify OTP',
        });
    }


})