import jwt from "jsonwebtoken";
import {promisify} from "node:util";
import {formattedAd} from "~/server/utils/formattedRequest.js";
import {getUserAuth} from "~/server/services/auth.service.js";

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')

    const query = getQuery(event)
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const FavoritesAd = event.context.FavoritesAd;
    const AdList = event.context.AdList;
    const Breeds = event.context.Breeds;
    const GeoCity = event.context.GeoCity;
    const GeoRegions = event.context.GeoRegions;
    const Users = event.context.Users;
    const AdExportRegions = event.context.AdExportRegions;
    const sequelize = event.context.sequelize;
    const statusMessage = 'Ошибка личных данных, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!AdList || !sequelize) {
        console.error('Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer
        });
    }

    try {
        let user
        await getUserAuth(token, Users)
            .then(res => user = res)
            .catch(err => {
                throw err
            })

        if(user.status !== 'active') {
            throw createError({ statusCode: 401, message: 'Неактивный пользователь: статус пользователя: ' + user.status}); // Исправлено: Выбрасываем ошибку
        }
        try {
            if(query.adId && user.id) {
                const deletedRows = await AdList.destroy({
                    where: {
                        id: query.adId,
                        owner: user.id
                    }
                });
                if (deletedRows === 0) {
                    throw createError({ statusCode: 400, message: 'Объявление не найдено', statusMessage });
                }
            }
            else {
                throw createError({ statusCode: 40, message: 'Не выбрано объявление', statusMessage });
            }
            return {
                message: 'Объявление успешно удалено из избранного',
                success: true
            }
        } catch (error) {
            console.log('Sequelize error:', error);
            console.error('Sequelize error:', error);
            throw createError({
                statusCode: 500,
                message: error,
            });
        }


    } catch (error) {
        console.error("Ошибка при верификации токена:", error);
        throw error
    }
});