//import {createError, defineEventHandler} from 'h3';

import { Op} from "sequelize";
import dayjs from "dayjs";

export default defineEventHandler(async (event) => {
    console.log('event.context', event.context)
    const query = getQuery(event)
    const queryFull = {}

    const AdList = event.context.AdList;
    const Breeds = event.context.Breeds;
    const GeoCity = event.context.GeoCity;
    const GeoRegions = event.context.GeoRegions;
    const Users = event.context.Users;
    const AdExportRegions = event.context.AdExportRegions;
    const sequelize = event.context.sequelize;
    const statusMessage = 'Ошибка входа, попробуйте, ещё раз'
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
        const queryBd = {}
        let sorting = []
        if (query.type) queryBd.type_ad = query.type;
        if (query.maxAgeMonth || query.minAgeMonth) {
            const fromAgeMonths = query.minAgeMonth? dayjs().subtract(Number(query.minAgeMonth), 'month'): 0;
            const toAgeMonths = query.maxAgeMonth !== 'infinite'? dayjs().subtract(Number(query.maxAgeMonth), 'month'): null;
            queryBd.date_birth = {}
            if (fromAgeMonths) queryBd.date_birth[Op.lte] = fromAgeMonths.toDate();
            if (toAgeMonths) queryBd.date_birth[Op.gte] = toAgeMonths.toDate();
        }
        if (query.breeds) {
            queryFull.breeds = await Breeds.findAll({
                where: {
                    value: query.breeds.split(',')
                }
            })
            queryBd.breed_id = query.breeds?.split(',');
        }
        if (query.gender) queryBd.gender = query.gender;
        if (query.regions) {
            queryBd.region_main = query.regions.split(',');
            queryFull.regions = await GeoRegions.findAll({
                where: {
                    value: query.regions.split(',')
                }
            })
        }
        if (query.city_main) queryBd.city_main = query.city.split(',');
        if (query['max-price'] || query['min-price']) {
            queryBd.price = {}
            if (query['max-price']) queryBd.price[Op.lte] = query['max-price'];
            if (query['min-price']) queryBd.price[Op.gte] = query['min-price'];
        }
        // Проверка наличия столбца
        //const [results, metadata] = await sequelize.query("SHOW COLUMNS FROM ad_list LIKE 'created_at'");
        //const [results2, metadata2] = await sequelize.query("SHOW COLUMNS FROM ad_list");
        //if (results.length > 0) {
           // console.log('Столбец created_at существует в таблице ad_list.', results2);
        //} else {
            //console.error('Столбец created_at НЕ существует в таблице ad_list!', results2);
        //}
        if(query.sorting) {
            if(query.sorting === 'priceUp') {
                sorting = [ ['price', 'ASC'] ]
            } else if(query.sorting === 'priceDown') {
                sorting = [ ['price', 'DESC'] ]
            } else if(query.sorting === 'createdAtDown') {
                sorting = [ ['created_at', 'DESC'] ]
            } else if(query.sorting === 'createdAtUp') {
                sorting = [ ['created_at', 'ASC'] ]
            }
        } else {
          sorting = [ ['created_at', 'DESC'] ]
        }
        queryFull.maxFullPrice = await AdList.max('price')

        let limit = 12; //значение по умолчанию
        let offset = 0;
        if (query.limit) limit = query.limit;
        if (query.offset) offset = query.offset;

        const adListDB = await AdList.findAndCountAll({
            where: {
                ...queryBd,
            },
            order: sorting,
            limit: limit,
            offset: offset,
            distinct: true, // Добавляем distinct
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

        console.log('AdList a', adListDB.rows)

        let result = await Promise.all(adListDB.rows.map(async (item) => {
            return {
                id: item.id,
                created_at: item.created_at,
                date_birth: item.date_birth,
                gender: item.gender,
                name: item.name,
                price: item.price,
                quantitative: item.quantitative,
                region_main: item.region_main,
                city_main: item.city_main,
                geo_main: {
                    region: item.LocationRegion,
                    city: item.LocationCity,
                   // city: adCityMain[0],
                },
                /*geo_main: {
                    region: adRegionMain[0],
                    city: adCityMain[0],
                },*/
                status: item.status,
                type_ad: item.type_ad,
                //необязательно для листинга
                description: item.description,
                parents: {
                    parents_dad: item.parents_dad,
                    parents_mum: item.parents_mum,
                },
                //временнно
                count_image: item.count_image,
                img: item.img,
                //

                //breed: item.breeds,
                breed: item.Breed,
                exportRegions: {
                    isExport: item.is_export,
                    regionsList: item.ExportRegions
                    //regionsList: item.GeoRegions
                },
                ownerDetails: item.Owner,
            }
        }))
        return {
            limit: Number(limit),
            queryDetails: queryFull,
            offset: Number(offset),
            count: adListDB.count || 0,
            result: result || 0
        }
    } catch (error) {
        console.log('Sequelize error:', error);
        console.error('Sequelize error:', error);
        throw createError({
            statusCode: 500,
            message: 'Ошибка при запросе к базе данных',
        });
    }
});