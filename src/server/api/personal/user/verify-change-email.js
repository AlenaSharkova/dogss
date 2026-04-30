
import { Op} from "sequelize";
import jwt from "jsonwebtoken";
import {getUserAuth} from "~/server/services/auth.service.js";
import {sendChangeEmailToOldEmail, sendOTPByEmail} from "~/server/services/mail.service.js";
import {sendAdModerationToTgAdmin, sendChangeEmailToTgAdmin} from "~/server/services/telegram.service.js";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const authHeader = getHeader(event, 'authorization')

    const tokenAuth = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const sequelize = event.context.sequelize;
    const Users = event.context.Users;
    const Otp = event.context.Otp;
    const statusMessage = 'Ошибка верификации, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    if (!Users || !Otp || !sequelize) {
        console.error( 'Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer
        });
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    let old_email
    let userSession

    if (!secretKey) {
        console.error('Ошибка: Переменная окружения JWT_SECRET_KEY не определена!');
        throw createError({
            statusCode: 500,
            message: 'Переменная окружения JWT_SECRET_KEY не определена!',
            statusMessage: statusMessageServer
        });
    }
    try {
        try {
            await getUserAuth(tokenAuth, Users)
                .then(res => userSession = res)
                .catch(err => {
                    throw err
                })
        } catch (error) {
            console.error("Ошибка при верификации токена:", error);
            throw error
        }
        if(!userSession.new_email) {
            throw createError({
                statusCode: 400,
                message: 'Не найден запрос на смену email',
                statusMessage: 'Не найден запрос на смену email',
            });
        }
        let user = null
        if (query?.code) {
            let OtpWithToken = await Otp.findOne({
                where: {
                    token: query?.code,
                    userId: userSession.id,
                    is_change_email: true
                }
            });
            if(!OtpWithToken) {
                throw createError({
                    statusCode: 401,
                    message: 'Token not found || !is_change_email',
                    statusMessage: 'Ошибка авторизации',
                });
            }
            if(OtpWithToken.userId !== userSession.id) {
                throw createError({
                    statusCode: 404,
                    message: 'Код для данного пользователя неверен',
                });
            }
            if (OtpWithToken.expiresAt < new Date()) {
                throw createError({
                    statusCode: 410,
                    message: 'Срок действия OTP истек.',
                });
            }
            user = await Users.findOne({where: {id: OtpWithToken.userId}});
            if (!user) {
                throw createError({
                    statusCode: 404,
                    message: 'User not found',
                });
            }
        }
        else if (userSession.new_email && query?.otp) {

            let OtpWithOtpToken = await Otp.findOne(
                {
                    where: {
                        userId: userSession.id,
                        is_change_email: true,
                        otp: query.otp,
                        expiresAt: {[Op.gt]: new Date()}
                    }
                }
            );

            if (!OtpWithOtpToken) {
                throw createError({
                    statusCode: 400,
                    message: 'Invalid OTP',
                    statusMessage: 'Неверно введённый код'
                });
            }
            await Otp.destroy(
                {
                    where: {
                        userId: userSession.id,
                        is_change_email: true,
                        otp: query.otp,
                        expiresAt: {[Op.gt]: new Date()}
                    }
                }
            );
        }
        // Проверка успешна!  Создаем и возвращаем JWT токен
        //const token = jwt.sign({ userId: user?.id }, secretKey, { expiresIn: '30d' });
        old_email =  userSession.email
        console.log('old_email00', old_email)
        userSession.email = userSession.new_email
        userSession.new_email = ''
        await userSession.save();

    } catch (error) {
        console.error(error);
        throw error
    }
    sendChangeEmailToOldEmail(old_email, userSession.email );
    sendChangeEmailToTgAdmin(event.context.TelegramBotMain, old_email, userSession.email, userSession.id)

    return {
        //token: token
        status: "Успешно обновлён email"
    }


})