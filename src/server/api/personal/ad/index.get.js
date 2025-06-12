import jwt from "jsonwebtoken";
import {promisify} from "node:util";
import {formattedAd} from "~/server/utils/formattedRequest.js";

export default defineEventHandler(async (event) => {
    console.log('event.context re', event.context)
    const authHeader = getHeader(event, 'authorization')

    const query = getQuery(event)

    console.log('authHeader 00',  authHeader)

    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    console.log('token', token)


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
        console.log('user 0000', user)
        try {
            if(query.id && query.status) {
                const adItemDB = await AdList.findOne({
                    where: {
                        status: query.status,
                        id: query.id,
                        owner: user.id
                    },
                    include: [
                        {
                            model: GeoRegions,
                            as: 'LocationRegion',
                        },
                        {
                            model: GeoRegions,
                            as: 'ExportRegions',
                            through: { attributes: [] }
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
                });
                return formattedAd(adItemDB);
            }
            let sorting = [ ['created_at', 'DESC'] ]

            const adListDBActive = await AdList.findAll({
                where: {
                    status: 'active',
                    owner: user.id
                },
                order: sorting,
                include: [
                    {
                        model: GeoRegions,
                        as: 'LocationRegion',
                    },
                    {
                        model: GeoRegions,
                        as: 'ExportRegions',
                        through: { attributes: [] }
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
            let resultActive = await Promise.all(adListDBActive?.map(async (item) => {
                return formattedAd(item);
            }))

            const adListDBDraft = await AdList.findAll({
                where: {
                    status: 'draft',
                    owner: user.id
                },
                order: sorting,
                include: [
                    {
                        model: GeoRegions,
                        as: 'LocationRegion',
                    },
                    {
                        model: GeoRegions,
                        as: 'ExportRegions',
                        through: { attributes: [] }
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
            let resultDraft = await Promise.all(adListDBDraft?.map(async (item) => {
                return formattedAd(item);
            }))

            return {
                result: {
                    ad_draft: resultDraft,
                    ad_active: resultActive,
                }
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