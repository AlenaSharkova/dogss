import breeds from "~/demoData/new_breeds.json";
import connection from "express";
import {formattedUserGlobal} from "~/server/utils/formattedRequest.js";


export default defineEventHandler(async (event)=>
{
    const query = getQuery(event)

    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const GeoCity = event.context.GeoCity;
    const GeoRegions = event.context.GeoRegions;

    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!Users || !GeoCity  || !GeoRegions || !sequelize) {
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
                include: [
                    {
                        model: GeoCity,
                        as: 'LocationUserCity',
                    },
                    {
                        model: GeoRegions,
                        as: 'LocationUserRegion',
                    }
                ]
            });
            if (!user) {
                throw createError({
                    statusCode: 404,
                    statusMessage: 'Пользователь не найден',
                })
            } else {
                return formattedUserGlobal(user)
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
            return usersList.map(user => formattedUserGlobal(user))
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessageServer
        });
    }
})