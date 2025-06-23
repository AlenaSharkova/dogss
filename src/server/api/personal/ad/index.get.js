import jwt from "jsonwebtoken";
import {promisify} from "node:util";
import {formattedAd} from "~/server/utils/formattedRequest.js";
import {getUserAuth} from "~/server/services/auth.service.js";

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')

    const query = getQuery(event)
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

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
            if(query.id && query.status) {
                const adItemDB = await AdList.findOne({
                    where: {
                        status: query.status,
                        id: query.id,
                        owner: user.id
                    },
                    include: [
                        {
                            model: Users,
                            as: 'UsersListFavoriteAd',
                            required: false,
                            through: {
                                attributes: [],
                            },
                            where: { id: user.id },
                        },
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

            const adListDBArchive = await AdList.findAll({
                where: {
                    status: 'archive',
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
            let resultArchive= await Promise.all(adListDBArchive?.map(async (item) => {
                return formattedAd(item);
            }))

            return {
                result: {
                    ad_draft: resultDraft,
                    ad_active: resultActive,
                    ad_archive: resultArchive,
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
        throw error
    }
});