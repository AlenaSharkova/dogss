//import {createError, defineEventHandler} from 'h3';

import { Op} from "sequelize";
import dayjs from "dayjs";
import {formattedAd} from "~/server/utils/formattedRequest.js";
import {getUserAuth} from "~/server/services/auth.service.js";

export default defineEventHandler(async (event) => {
    console.log('event.context', event.context)
    const query = getQuery(event)
    const queryFull = {}
    let userId = null

    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const AdList = event.context.AdList;
    const Breeds = event.context.Breeds;
    const GeoCity = event.context.GeoCity;
    const GeoRegions = event.context.GeoRegions;
    const Users = event.context.Users;
    const AdExportRegions = event.context.AdExportRegions;
    const sequelize = event.context.sequelize;
    const statusMessage = 'Ошибка входа, попробуйте ещё раз'
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
        //запрос на одно объявление
        //TODO: проверка на админа, без user.id - status=='active'?, 'moderation'- не показывать чужим

        if(query?.id) {
            const adItemDB = await AdList.findOne({
                where: {
                    id: query.id
                },
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

            return formattedAd(adItemDB)

        }
        const queryBd = {}
        let sorting = []
        let user
        await getUserAuth(token, Users)
            .then(res => user = res)
            .catch(err => {
                return ''
            })

        if(query.status === 'moderation') {
            //TODO: проверка на админа
            const adListDB = await AdList.findAll({
                where: {
                    status: 'moderation'
                },
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
            return await Promise.all(adListDB.map((item) => {
                return formattedAd(item);
            }))
        }



        if (user?.id) userId = user.id;
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
        queryBd.status = 'active';

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

        console.log('...queryBd', {...queryBd})
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
                    model: Users, // Или FavoritesAd, если хотите получить данные из таблицы FavoritesAd
                    as: 'UsersListFavoriteAd', //  Правильный алиас!
                    required: false, // Важно!  Чтобы запрос работал, даже если объявление не в избранном
                    through: {
                        attributes: [],  // Не нужны атрибуты из промежуточной таблицы
                    },
                    where: { id: userId },
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
            required: true
        });

        console.log('AdList a', adListDB.rows)

        let result = await Promise.all(adListDB.rows.map((item) => {
            return formattedAd(item);
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