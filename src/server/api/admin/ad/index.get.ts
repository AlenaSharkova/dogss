//import {createError, defineEventHandler} from 'h3';

import { Op} from "sequelize";
import dayjs from "dayjs";
import {formattedAd, formattedAdShort} from "~/server/utils/formattedRequest.ts";
import {getUserAuth} from "~/server/services/auth.service.js";
import { ref } from 'vue';
import { UserBDItemStruct} from "~/server/struct/UserStruct";
import {adminEmail} from "~/server/utils/paramsData";
import {AdAdminListStruct, AdBDItemStruct, AdQueryAdminStruct} from "~/server/struct/AdStruct";

export default defineEventHandler(async (event) => {
    console.log('event.context', event.context)
    const query: AdQueryAdminStruct = getQuery(event)
    let queryFilter = {}
    let userId: number | null = null
    let queryDB = {}
    let limit = 12; //значение по умолчанию
    let offset = 0;

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

    let user = ref<UserBDItemStruct | null>(null)

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

        await getUserAuth(token, Users)
            .then(res => user.value = res as UserBDItemStruct)
            .catch(err => {
                console.log('неавторизованный пользователь', err)
            })
        if(!user.value) {
            throw createError({
                statusCode: 401,
                message: 'Пользователь не найден',
                statusMessage: 'Пользователь не найден'
            });
        }
        if(user.value.email !== adminEmail) {
            throw createError({
                statusCode: 401,
                message: 'Нет прав доступа к ресурсам',
                statusMessage: 'Нет прав доступа к ресурсам'
            });
        } else {
            if (user.value.id) userId = user.value.id;
        }

        if(query?.id) {
            const adItemDB = await requestDBAdById()
            return formattedAd(adItemDB)
        }

        //запрос для админа 'moderation' листинг объявлений
        console.log('query.status.split(\',\')', query.status?.split(','), query.status?.split(',').includes('moderation'),  query.status?.split(',').includes('blocked') )
        if(query.status?.split(',').includes('moderation') || query.status?.split(',').includes('blocked') ) {
            const adListDB = await requestDBAdAdmin() as AdBDItemStruct[]
            return adListDB.reduce((list: AdAdminListStruct, item) => {
                console.log('item200', list)
                if (item.status === 'moderation') list.moderation.push(formattedAdShort(item))
                if (item.status === 'blocked') list.blocked.push(formattedAdShort(item))
                if (item.status === 'draft') list.draft.push(formattedAdShort(item))
                return list
            }, {
                moderation: [],
                blocked: [],
                draft: [],
            })
        }
    } catch (error) {
        console.log('Sequelize error:', error);
        console.error('Sequelize error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при запросе к базе данных',
        });
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

                }
            ],
            required: true
        });
    }

    async function requestDBAdAdmin() {
        return await AdList.findAll({
            where: {
                status: ['moderation', 'blocked']
            },
            order: [['created_at', 'DESC']],
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
    }

});

