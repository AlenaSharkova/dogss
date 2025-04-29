// server/api/breeds.ts

export default defineEventHandler(async (event) => {
    console.log('event.context', event.context)
    const query = getQuery(event)

    const GeoRegions = event.context.GeoRegions; // Получаем модель Breed из контекста Nitro
    const GeoCity = event.context.GeoCity;
    const sequelize = event.context.sequelize;

    if (!GeoRegions || !GeoCity || !sequelize) {
        console.error('Models or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            statusMessage: 'Database connection error',
        });
    }
    let regionsList, regionsListFull, regionsListPlan
    try {
        console.log('query?.regionValue', query?.regionValue)
        if (query && query?.regionValue) {
            return await GeoCity.findAll({
                where: {
                    region_id: query.regionValue,
                },
            })
        }
        regionsList = await GeoRegions.findAll()
        regionsListPlan = regionsList.map(region => region.get({ plain: true })); // Преобразуем результаты
        console.log('query?.onlyRegions === true', query?.onlyRegions === true, query?.onlyRegions)
        if(query && query?.onlyRegions === 'true') {
            return regionsListPlan
        }
        await Promise.all(regionsListPlan.map(async (region) => {
            return {
                ...region,
                children: await GeoCity.findAll({
                    where: {
                        region_id: region.value,
                    },
                })
            }
        })).then(res =>
            regionsListFull = res
        )
        return regionsListFull
    }

    catch (error) {
        console.error('Sequelize error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при запросе к базе данных',
            data: error,
        });
    }
});