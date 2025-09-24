import {createError, defineEventHandler} from 'h3';

import { Op} from "sequelize";
import {getUserAuth} from "~/server/services/auth.service.js";
import { ref } from 'vue';
import { UserBDItemStruct} from "~/server/struct/UserStruct";
import {AdAdminListStruct, AdBDItemStruct, AdQueryAdminStruct} from "~/server/struct/AdStruct";
import {generateRandomHash} from "~/server/utils/generate";
import {AdCommentSend} from "~/server/struct/AdCommentStruct";

export default defineEventHandler(async (event) => {
    console.log('event.context', event.context)
    const body: AdCommentSend = await readBody(event)

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
        const ad = await AdList.findOne({
            where: {
                hash_link_comment: body.hash_link_comment,
            },
        })
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
            if(ad.expires_at_hash_link_comment < new Date()) {
                throw createError({
                    statusCode: 403,
                    message: 'Срок действия ссылки истек' + ad.expires_at_hash_link_comment,
                    statusMessage: 'Срок действия ссылки истек'
                });
            }
            ad.text_comment = body.text_comment
            ad.rating_commenter = body.rating_commenter
            ad.id_user_commenter = body.id_user_commenter
            await ad.save();
            return {
                success: true,
                message: 'Отзыв добавлен'
            }
        }

    } catch (error) {
        console.log('Sequelize error:', error);
        console.error('Sequelize error:', error);
        throw error
    }

    async function requestDBAdByHashComment() {
        return await AdList.findOne({
            where: {
                hash_link_comment: body.hash_link_comment,
            },
        });
    }
});

