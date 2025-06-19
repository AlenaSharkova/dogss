import jwt from "jsonwebtoken";
import {promisify} from "node:util";
import {formattedAd} from "~/server/utils/formattedRequest.js";
import {getUserAuth} from "~/server/services/auth.service.js";

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const FavoritesAd = event.context.FavoritesAd;
    const AdList = event.context.AdList;
    const Breeds = event.context.Breeds;
    const GeoCity = event.context.GeoCity;
    const GeoRegions = event.context.GeoRegions;
    const Users = event.context.Users;
    const AdExportRegions = event.context.AdExportRegions;
    const sequelize = event.context.sequelize;
    const statusMessage = 'Ошибка избранных объявлений, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!AdList || !FavoritesAd || !sequelize) {
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
        console.log('user 0000', user)
        try {
            let sorting = [ ['created_at', 'ASC'] ]

            const adListDBActive = await AdList.findAll({
                where: {
                    status: 'active'
                },
                order: sorting,
                include: [
                    {
                        model: Users,
                        as: 'UsersListFavoriteAd', // Используем псевдоним, определенный в модели Users
                        where: { id: user.id },
                        through: {
                            model: FavoritesAd,
                            attributes: []  // Исключаем атрибуты из связующей таблицы
                        },
                        required: true // Обязательное условие, чтобы получить только избранные
                    },
                    {
                        model: GeoRegions,
                        as: 'LocationRegion',
                    },
                    {
                        model: GeoRegions,
                        as: 'ExportRegions',
                    },
                    {
                        model: Breeds,
                        as: 'Breed',
                    },
                    {
                        model: GeoCity,
                        as: 'LocationCity',
                    },
                    {
                        model: Users,
                        as: 'Owner',
                    }
                ],
                required: true
            });
            let result = await Promise.all(adListDBActive?.map(async (item) => {
                return formattedAd(item);
            }))
            return {
                result
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
        throw error
    }
});