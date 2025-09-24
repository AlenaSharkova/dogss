import {createError, defineEventHandler} from 'h3';

import {getUserAuth} from "~/server/services/auth.service.js";
import { ref } from 'vue';
import { UserBDItemStruct} from "~/server/struct/UserStruct";
import {generateRandomHash} from "~/server/utils/generate";

export default defineEventHandler(async (event) => {
    console.log('event.context', event.context)
    const query: {id: number} = getQuery(event)

    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const AdList = event.context.AdList;
    const Users = event.context.Users;
    const sequelize = event.context.sequelize;
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
                id: query.id,
                owner: user.value.id
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
            const hashLinkComment = generateRandomHash()
            console.log('Date.now()55', Date.now())
            const expiresAtHashLinkComment = new Date(Date.now() + 3 * 60 * 60 * 1000); // Срок действия 3 часа
            if(!hashLinkComment || !expiresAtHashLinkComment) {
                throw createError({
                    statusCode: 500,
                    message: 'Ошибка создания хеша',
                    statusMessage: 'Ошибка получения ссылки'
                });
            }
            ad.hash_link_comment = hashLinkComment
            ad.expires_at_hash_link_comment = expiresAtHashLinkComment
            await ad.save();
            return {hash: hashLinkComment};
        }

    } catch (error) {
        console.log('Sequelize error:', error);
        console.error('Sequelize error:', error);
        throw error
    }
});

