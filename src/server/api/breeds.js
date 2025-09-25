
export default defineEventHandler(async (event) => {
    console.log('event.context', event.context)
    const query = getQuery(event)
    const sequelize = event.context.sequelize;
    const Breeds = event.context.Breeds; // Получаем модель Breed из контекста Nitro

    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!Breeds || !sequelize) {
        console.error('Breeds model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer
        });
    }

    try {
        return await Breeds.findAll();
    } catch (error) {
        console.error('Sequelize error:', error);
        throw error
    }
});