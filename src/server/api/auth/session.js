import jwt from "jsonwebtoken";
import {promisify} from "node:util";

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>
    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const Otp = event.context.Otp;
    const statusMessage = 'Ошибка получения Ваших данных, попробуйте, ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!Users || !Otp || !sequelize) {  // Исправлено: добавлены логические операторы OR
        console.error('Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer,
        });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        console.error('Ошибка: Переменная окружения JWT_SECRET_KEY не определена!');
        throw createError({
            statusCode: 500,
            message: 'Internal Server Error',
            statusMessage: statusMessageServer,
        });
    }

    if (token == null) {
        throw createError({
            statusCode: 401,
            message: 'Нет токена',
            statusMessage
        }); // Нет токена
    }

    try {
        const jwtVerify = promisify(jwt.verify);
        const dataToken = await jwtVerify(token, secretKey);

        if(!dataToken?.userId) {
            throw createError({ statusCode: 401, message: 'Неавторизованный пользователь: нет информации о пользователе в токене' }); // Исправлено: Выбрасываем ошибку
        }
        const user = await Users.findOne({where: {id: dataToken.userId}});
        if(!user) {
            throw createError({ statusCode: 401, message: 'Неавторизованный пользователь: пользователь не найден' }); // Исправлено: Выбрасываем ошибку
        }
        if(user.status !== 'active') {
            throw createError({ statusCode: 401, message: 'Неактивный пользователь: статус пользователя: ' + user.status}); // Исправлено: Выбрасываем ошибку
        }
        return {
            id: user.id,
            status: user.status,
            personal_data: {
                address: user.address,
                email: user.email,
                id: user.id,
                last_name: user.last_name,
                photo: user.photo,
                first_name: user.first_name,
                status: user.status,
                geo_main: {
                    city: user.LocationRegion,
                    region: user.LocationCity
                }
            }
        } // Возвращаем пользователя, если все проверки пройдены
    } catch (error) {
        console.error("Ошибка при верификации токена:", error);
        if (error.name === 'TokenExpiredError') {
            throw createError({ statusCode: 401, message: 'Token has expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            throw createError({ statusCode: 403, message: 'Invalid token' });
        }
        throw error

        //throw createError({ statusCode: 500, message: 'Failed to verify token' });
    }
});