import breeds from "~/demoData/new_breeds.json";
import connection from "express";
import {formattedUserGlobal, formattedUserGlobalShort} from "~/server/utils/formattedRequest.ts";


export default defineEventHandler(async (event)=>
{
    const query = getQuery(event)

    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const GeoCity = event.context.GeoCity;
    const GeoRegions = event.context.GeoRegions;
    const AdList = event.context.AdList;
    const Breeds = event.context.Breeds;

    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!Users || !GeoCity  || !AdList || !GeoRegions || !sequelize) {
        console.error('Breeds model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer
        });
    }
    try {
        if (query?.id) {
            const user = await Users.findOne({
                where: {
                    id: query.id
                },
                include: [
                    {
                        model: GeoCity,
                        as: 'LocationUserCity',
                    },
                    {
                        model: GeoRegions,
                        as: 'LocationUserRegion',
                    },
                    {
                        model: AdList,
                        as: 'UserAdList',
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
                    }
                ]
            });
            if (!user) {
                throw createError({
                    statusCode: 404,
                    statusMessage: 'Пользователь не найден',
                })
            } else {
                const a = await formattedUserGlobal(user, Users)
                console.log(222)
                return a
            }
        } else {
            const usersList = await Users.findAll(
                {include: [
                    {
                        model: GeoCity,
                        as: 'LocationUserCity',
                    },
                    {
                        model: GeoRegions,
                        as: 'LocationUserRegion',
                    }
                ]}
            );
            return usersList.map(user => formattedUserGlobalShort(user))
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessageServer
        });
    }
})