import {createError, defineEventHandler} from 'h3';

import { Op} from "sequelize";
import {getUserAuth} from "~/server/services/auth.service.js";
import { ref } from 'vue';
import { UserBDItemStruct} from "~/server/struct/UserStruct";
import {AdAdminListStruct, AdBDItemStruct, AdQueryAdminStruct} from "~/server/struct/AdStruct";
import {generateRandomHash} from "~/server/utils/generate";

export default defineEventHandler(async (event) => {
    console.log('event.context', event.context)
    const query: {hash: string} = getQuery(event)
    let userId: number | null = null

    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const AdList = event.context.AdList;
    const Breeds = event.context.Breeds;
    const GeoCity = event.context.GeoCity;
    const GeoRegions = event.context.GeoRegions;
    const Users = event.context.Users;
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
        const ad = await requestDBAdByHashComment()
        if(!ad) {
            throw createError({
                statusCode: 401,
                message: 'Нет прав доступа к ресурсу',
                statusMessage: 'Нет прав доступа к ресурсу'
            });
        } else {
            if(ad.id_user_commenter && ad.rating_commenter) {
                throw createError({
                    statusCode: 403,
                    message: 'Отзыв уже был создан',
                    statusMessage: 'Отзыв уже был создан'
                });
            }
            if(user.value.id === ad.owner) {
                throw createError({
                    statusCode: 403,
                    message: 'Пользователь и комментатор один и тот же человек',
                    statusMessage: 'Вы ен можете оставить отзыв сами себе'
                });
            }
            if(ad.expires_at_hash_link_comment < new Date()) {
                throw createError({
                    statusCode: 403,
                    message: 'Срок действия ссылки истек' + ad.expires_at_hash_link_comment,
                    statusMessage: 'Срок действия ссылки истек. Пожалуйста, запросите новую'
                });
            }
            return formattedAdShort(ad)
        }

    } catch (error) {
        console.log('Sequelize error:', error);
        console.error('Sequelize error:', error);
        throw error
    }

    async function requestDBAdByHashComment() {
        return await AdList.findOne({
            where: {
                hash_link_comment: query.hash,
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
});

