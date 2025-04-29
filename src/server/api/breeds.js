
export default defineEventHandler(async (event) => {
    console.log('event.context', event.context)
    const query = getQuery(event)
    const sequelize = event.context.sequelize;

    const Breeds = event.context.Breeds; // Получаем модель Breed из контекста Nitro

    if (!Breeds || !sequelize) {
        console.error('Breeds model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            statusMessage: 'Database connection error',
        });
    }

    try {
        return await Breeds.findAll();
    } catch (error) {
        console.error('Sequelize error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при запросе к базе данных',
            data: error,
        });
    }
});