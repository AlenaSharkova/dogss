//import {createError, defineEventHandler} from 'h3';

import { Op} from "sequelize";
import dayjs from "dayjs";
import {formattedAd, formattedAdShort} from "~/server/utils/formattedRequest.ts";
import {getUserAuth} from "~/server/services/auth.service.js";

export default defineEventHandler(async (event) => {
    console.log('event.context', event.context)
    const query = getQuery(event)
    let queryFilter = {}
    let userId = null
    let queryDB = {}
    const sorting = []
    let limit = 12; //значение по умолчанию
    let offset = 0;

    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>
    const AdList = event.context.AdList;
    const Breeds = event.context.Breeds;
    const GeoCity = event.context.GeoCity;
    const GeoRegions = event.context.GeoRegions;
    const UploadedFile = event.context.UploadedFile;
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

        //для запроса листинга с favorites флагами от session-ого пользователя

        let user
        await getUserAuth(token, Users)
            .then(res => user = res)
            .catch(err => {
                console.log('неавторизованный пользователь', err)
            })


        
        if (user?.id) userId = user.id;

        if(query?.id) {
            const adItemDB = await requestDBAdById()
            return formattedAd(adItemDB)
        }

        const queryData = await getQueryData()
        console.log('...queryData', queryData)
        queryDB = queryData.queryDB
        queryFilter  = queryData.queryFilter
        console.log('...queryDB', {...queryDB.value })

        if (query.limit) limit = query.limit;
        if (query.offset) offset = query.offset;
        
        sorting.push(getSorting())
        console.log('...queryDB', {...queryDB.value })
        const adListDB = await requestDBAdListCount()

        console.log('AdList a', adListDB.rows)

        let result = await Promise.all(adListDB.rows.map((item) => {
            return formattedAdShort(item);
        }))
        return {
            limit: Number(limit),
            queryDetails: queryFilter,
            offset: Number(offset),
            count: adListDB.count || 0,
            result: result || 0
        }
    } catch (error) {
        console.log('Sequelize error:', error);
        console.error('Sequelize error:', error);
        throw error
    }

    // local functions

    async function requestDBAdById() {
        return await AdList.findOne({
            where: {
                id: query.id
            },
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
                    through: {attributes: []}
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
                    include: [
                        {
                            model: AdList,
                            as: 'UserAdList'
                        }
                    ]

                },
                {
                    model: UploadedFile,
                    as: 'PhotosObject',
                    where: {
                        purpose: 'ad'
                    },
                },
            ],
            required: true
        });
    }
    async function requestDBAdListCount() {
        console.log('Внутри requestDBAdListCount, queryDB:', queryDB);  // <-- ВАЖНО!
        return await AdList.findAndCountAll({
            order: sorting,
            offset: offset,
            limit: limit,
            where: {
                ...queryDB ,
            },
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
                },
                {
                    model: UploadedFile,
                    as: 'PhotosObject',
                    where: {
                        purpose: 'ad'
                    },
                },
            ],
            required: true
        });
    }

    function getSorting() {
        if(query.sorting) {
            if(query.sorting === 'priceUp') {
                return [ ['price', 'ASC'] ]
            } else if(query.sorting === 'priceDown') {
                return [ ['price', 'DESC'] ]
            } else if(query.sorting === 'createdAtDown') {
                return [ ['created_at', 'DESC'] ]
            } else if(query.sorting === 'createdAtUp') {
                return [ ['created_at', 'ASC'] ]
            } else return [ ['created_at', 'ASC'] ]
        } else {
            return [ ['created_at', 'ASC'] ]
        }
    }

    async function getQueryData() {
        let queryDB = {}
        let queryFilter = {}
        if (query.type) queryDB.type_ad = query.type;
        if (query.maxAgeMonth || query.minAgeMonth) {
            const fromAgeMonths = query.minAgeMonth? dayjs().subtract(Number(query.minAgeMonth), 'month'): 0;
            const toAgeMonths = query.maxAgeMonth !== 'infinite'? dayjs().subtract(Number(query.maxAgeMonth), 'month'): null;
            queryDB.date_birth = {}
            if (fromAgeMonths) queryDB.date_birth[Op.lte] = fromAgeMonths.toDate();
            if (toAgeMonths) queryDB.date_birth[Op.gte] = toAgeMonths.toDate();
        }
        if (query.breeds) {
            queryFilter.breeds = await Breeds.findAll({
                where: {
                    value: query.breeds.split(',')
                }
            })
            queryDB.breed_id = query.breeds?.split(',');
        }
        if (query.gender) queryDB.gender = query.gender;
        queryDB.status = 'active';
        if (query.regions) {
            queryDB.region_main = query.regions.split(',');
            queryFilter.regions = await GeoRegions.findAll({
                where: {
                    value: query.regions.split(',')
                }
            })
        }
        if (query.city_main) queryDB.city_main = query.city.split(',');
        if (query['max-price'] || query['min-price']) {
            queryDB.price = {}
            if (query['max-price']) queryDB.price[Op.lte] = query['max-price'];
            if (query['min-price']) queryDB.price[Op.gte] = query['min-price'];
        }

        queryFilter.maxFullPrice = await AdList.max('price')
        return { queryDB, queryFilter }
    }
});

