import jwt from "jsonwebtoken";
import {promisify} from "node:util";

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>
    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const Otp = event.context.Otp;

    if (!Users || !Otp || !sequelize) {  // Исправлено: добавлены логические операторы OR
        console.error('Model or sequelize is not available in the context');
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
            statusMessage: 'Internal Server Error',
        });
    }

    if (token == null) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Нет токена',
        }); // Нет токена
    }

    try {
        const jwtVerify = promisify(jwt.verify);
        const dataToken = await jwtVerify(token, secretKey);

        if(!dataToken?.userId) {
            throw createError({ statusCode: 401, statusMessage: 'Неавторизованный пользователь: нет информации о пользователе в токене' }); // Исправлено: Выбрасываем ошибку
        }

        const user = await Users.findOne({where: {id: dataToken.userId}});
        if(!user) {
            throw createError({ statusCode: 401, statusMessage: 'Неавторизованный пользователь: пользователь не найден' }); // Исправлено: Выбрасываем ошибку
        }
        return user; // Возвращаем пользователя, если все проверки пройдены
    } catch (error) {
        console.error("Ошибка при верификации токена:", error);

        if (error.name === 'TokenExpiredError') {
            throw createError({ statusCode: 401, statusMessage: 'Token has expired' }); // Исправлено: Выбрасываем ошибку
        }
        if (error.name === 'JsonWebTokenError') {
            throw createError({ statusCode: 403, statusMessage: 'Invalid token' }); // Исправлено: Выбрасываем ошибку
        }
        throw createError({ statusCode: 500, statusMessage: 'Failed to verify token' }); // Исправлено: Выбрасываем ошибку
    }
});