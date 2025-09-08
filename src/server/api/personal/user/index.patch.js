import {getUserAuth} from "~/server/services/auth.service.js";

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')

    const body = await readBody(event)

    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const AdList = event.context.AdList;
    const Breeds = event.context.Breeds;
    const GeoCity = event.context.GeoCity;
    const GeoRegions = event.context.GeoRegions;
    const Users = event.context.Users;
    const AdExportRegions = event.context.AdExportRegions;
    const sequelize = event.context.sequelize;
    const statusMessage = 'Ошибка обновления личных данных, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!Users || !sequelize) {
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

            if (body.first_name) {
                user.first_name = body.first_name;
            }
            if (body.last_name) {
                user.last_name = body.last_name;
            }
            if (body.email) {
                user.email = body.email;
            }
            if (body.photo) {
                user.photo = body.photo;
            }
            if (body.region) {
                user.region = body.region;
            }
            if (body.city) {
                user.city = body.city;
            }
            if (body.contact_methods) {
                user.contact_methods = body.contact_methods;
            }

            await user.save();

            return {
                message: 'Обновление пользователя успешно',
                success: true,
                user
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