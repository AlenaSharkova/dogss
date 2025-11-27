import {formattedBreeders, formattedDogsShort} from "~/server/utils/formattedRequest";

export default defineEventHandler(async (event) => {
    const sequelize = event.context.sequelize;
    const body = await readBody(event)

    const statusMessage = 'Ошибка входа, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    const AdList = event.context.AdList;
    const Dogs = event.context.Dogs;
    const Breeders = event.context.Breeders;
    const Breeds = event.context.Breeds;


    try {
        if (!AdList || !Breeders || !Dogs || !Breeds || !sequelize) {
            console.error('Model or sequelize is not available in the context');
            throw createError({
                statusCode: 500,
                message: 'Database connection error',
                statusMessage: statusMessageServer
            });
        }
        if(body.id) {
            Dogs.create(body.my_dogs);
            Breeders.create({
                ...body,
                my_dogs: body.my_dogs.map(item => item.id)
            })
        } else throw createError({
            statusCode: 403,
            message: 'id не передан',
            statusMessage: statusMessageServer
        });
    } catch (err) {
        throw err;
    }

})