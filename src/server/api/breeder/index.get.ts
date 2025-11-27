import {formattedBreeders, formattedDogsShort} from "~/server/utils/formattedRequest";

export default defineEventHandler(async (event) => {
    const query: {id: number} = getQuery(event)
    const sequelize = event.context.sequelize;

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
        console.log('query breeder', query)
        if(query.id) {
            const breederInfo = await requestDBBreeders()
            if(breederInfo) {
                return formattedBreeders(breederInfo)
            } else {
                throw createError({
                    statusCode: 403,
                    message: 'breeder не существует',
                    statusMessage: statusMessageServer
                });
            }
        } else throw createError({
            statusCode: 403,
            message: 'id не передан',
            statusMessage: statusMessageServer
        });
    } catch (err) {
        throw err;
    }

    async function requestDBBreeders() {
        return await Breeders.findOne({
            where: {
                id: query.id
            },
            include: [
                {
                    model: Dogs,
                    as: 'MyDogs',
                    include: [
                        {
                            model: Breeds,
                            as: 'Breed',
                        },
                    ]

                }
            ]
        })
    }
})