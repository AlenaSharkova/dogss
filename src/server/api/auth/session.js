import jwt from "jsonwebtoken";
import {promisify} from "node:util";

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>
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
        // decoded теперь содержит информацию о пользователе (например, decoded.userId)
        const dataToken = await jwtVerify(token, secretKey); // Возвращаем информацию о пользователе
        if(!dataToken?.userId) {
            createError({ statusCode: 401, statusMessage: 'Неавторизованный пользователь' });
        }
        const user = await Users.findOne({where: {id: dataToken.userId}});
        if(!user) {
            createError({ statusCode: 401, statusMessage: 'Неавторизованный пользователь: пользователь не найден' });
        }
        return user
    } catch (error) {
        console.error("Ошибка при верификации токена:", error); // Важно логировать ошибку
        // Обработка ошибок, связанных с jwt.verify, истекшим токеном и т.д.
        if (error.name === 'TokenExpiredError') {
            throw createError({ statusCode: 401, statusMessage: 'Token has expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            throw createError({ statusCode: 403, statusMessage: 'Invalid token' });
        }
        throw createError({ statusCode: 500, statusMessage: 'Failed to verify token' });
    }
})