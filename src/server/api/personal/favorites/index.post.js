import {promisify} from "node:util";
import jwt from "jsonwebtoken";
import {getUserAuth} from "~/server/services/auth.service.js";


export default defineEventHandler(async (event) => {
    const { adId } = await readBody(event)
    const statusMessage = 'Ошибка избранных объявлений, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if(!adId) {
        throw createError({
            statusCode: 500,
            message: 'Нет id объявления',
            statusMessage: statusMessageServer,
        });
    }
    console.log('event.context.FavoritesAd', event.context.FavoritesAd)
    const FavoritesAd = event.context.FavoritesAd;
    const AdList = event.context.AdList;
    const Users = event.context.Users;
    const sequelize = event.context.sequelize;


    if (!AdList || !FavoritesAd || !Users || !sequelize) {
        console.error('Model or sequelize is not available in the context');
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
            message: 'Internal Server Error',
            statusMessage: statusMessageServer,
        });
    }

    const authHeader = getHeader(event, 'authorization')

    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    try {
        let user
        await getUserAuth(token, Users)
            .then(res => user = res)
            .catch(err => {
                throw err
            })
        // 1. Проверьте, существует ли пользователь и объявление
        const ad = await AdList.findByPk(adId);

        if (!ad) {
            throw new Error(`Объявление с ID ${adId} не найдено.`);
        }
        if (ad.status === 'draft') {
            throw new Error(`Нельзя добавить черновик в избранное.`);
        }

        // 2. Проверьте, не добавлено ли объявление уже в избранное этого пользователя.
        const existingFavorite = await FavoritesAd.findOne({
            where: {
                user_id: user.id,
                ad_id: adId,
            },
        });

        if (existingFavorite) {
            throw new Error(`Объявление с ID ${adId} уже добавлено в избранное пользователя с ID ${user.id}.`);
        }


        // 3. Создайте запись в таблице favorites_ad
        await FavoritesAd.create({
            user_id: user.id,
            ad_id: adId,
        });


        return {
            success: true,
            message: '`Объявление с ID ${adId} успешно добавлено в избранное пользователя с ID ${user.id}.`'
        };
    } catch (error) {
        console.error("Ошибка при добавлении объявления в избранное:", error.message);
        throw error; // Важно: пробросить ошибку для обработки выше
    }
})
