import {getUserAuth} from "~/server/services/auth.service.js";
import {deleteFiles} from "~/server/services/upload.service.js";

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')

    const query = getQuery(event)
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const FavoritesAd = event.context.FavoritesAd;
    const AdList = event.context.AdList;
    const Breeds = event.context.Breeds;
    const GeoCity = event.context.GeoCity;
    const GeoRegions = event.context.GeoRegions;
    const Users = event.context.Users;
    const AdExportRegions = event.context.AdExportRegions;
    const sequelize = event.context.sequelize;
    const statusMessage = 'Ошибка личных данных, попробуйте ещё раз'
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
        let user
        await getUserAuth(token, Users)
            .then(res => user = res)
            .catch(err => {
                throw err
            })

        if(user.status !== 'active') {
            throw createError({ statusCode: 401, message: 'Неактивный пользователь: статус пользователя: ' + user.status}); // Исправлено: Выбрасываем ошибку
        }
        try {
            if(query.adId) {
                let deletedRows
                const deletedAd = await AdList.findOne({
                    where: {
                        id: query.adId,
                        status: query.status,
                        owner: user.id
                    }
                })
                console.log('deletedAds000112', deletedAd.photos, deletedAd)

                if(!deletedAd){
                    throw createError({ statusCode: 400, message: 'Объявление не найдено', statusMessage });
                }

                if(deletedAd?.photos?.length) {
                    await deleteFiles(deletedAd.photos)

                }


                deletedRows = await AdList.destroy({
                    where: {
                        id: query.adId,
                        owner: user.id,
                        status: query.status,
                    }
                });

                console.log('deletedRows000112', deletedAd.photos )

                if (deletedRows === 0) {
                    throw createError({ statusCode: 400, message: 'Объявление не найдено', statusMessage });
                }

            }
            else {
                let deletedRows
                const deletedAdsList = await AdList.findAll({
                    where: {
                        owner: user.id,
                        status: query.status,
                    }
                })
                if(!deletedAdsList){
                    throw createError({ statusCode: 400, message: 'Объявление не найдено', statusMessage });
                }

                for (const item of deletedAdsList) {
                    console.log('item of deletedRows', item)
                    if(item?.photos?.length) {
                        await deleteFiles(item.photos)
                    }
                }
                deletedRows = await AdList.destroy({
                    where: {
                        owner: user.id,
                        status: query.status,
                    }
                });


                console.log('deletedAdsList0011', deletedAdsList)
                if (deletedRows === 0) {
                    throw createError({ statusCode: 400, message: 'Объявление не найдено', statusMessage });
                }

            }
            return {
                message: 'Объявление успешно удалено из черновика',
                success: true
            }
        } catch (error) {
            console.log('Sequelize error:', error);
            console.error('Sequelize error:', error);
            throw createError({
                statusCode: 500,
                message: error,
            });
        }


    } catch (error) {
        console.error("Ошибка при верификации токена:", error);
        throw error
    }
});

const deleteImage = async (item) => {
    const data = await fetch("/api/upload/delete", {
        method: "post",
        body: {
            fileUrlList: item.photos
        },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    console.log('data000', data)
    if (error) {
        throw createError({statusCode: 400, message: 'Картинки не удалены '});
    }
}
