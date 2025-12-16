import {promisify} from "node:util";
import jwt from "jsonwebtoken";

export async function getUserAuth(token, Users, includeUserList) {
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            console.error('Ошибка: Переменная окружения JWT_SECRET_KEY не определена!');
            throw createError({
                statusCode: 500,
                message: 'Internal Server Error',
            });
        }

        if (token == null) {
            throw createError({
                statusCode: 401,
                message: 'Нет токена',
            }); // Нет токена
        }
        const jwtVerify = promisify(jwt.verify);
        const dataToken = await jwtVerify(token, secretKey);

        if(!dataToken?.userId) {
            throw createError({ statusCode: 401, message: 'Неавторизованный пользователь: нет информации о пользователе в токене' }); // Исправлено: Выбрасываем ошибку
        }
        const user = await Users.findOne({where: {id: dataToken.userId}, include: includeUserList});

        if(!user) {
            throw createError({ statusCode: 401, message: 'Неавторизованный пользователь: пользователь не найден' }); // Исправлено: Выбрасываем ошибку
        }
        return user
    } catch (error) {
        console.error("Ошибка при верификации токена:", error);
        if (error.name === 'TokenExpiredError') {
            throw createError({ statusCode: 401, message: 'Срок действия токена истек' });
        }
        if (error.name === 'JsonWebTokenError') {
            throw createError({ statusCode: 403, message: 'Invalid token' });
        }
        throw error
    }
}