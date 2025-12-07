import {formattedAd} from "~/server/utils/formattedRequest.ts";
import {getUserAuth} from "~/server/services/auth.service.js";

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')

    const query = getQuery(event)
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const AdList = event.context.AdList;
    const Breeds = event.context.Breeds;
    const GeoCity = event.context.GeoCity;
    const GeoRegions = event.context.GeoRegions;
    const Users = event.context.Users;
    const AdExportRegions = event.context.AdExportRegions;
    const UploadedFile = event.context.UploadedFile;
    const sequelize = event.context.sequelize;
    const statusMessage = 'Ошибка личных данных, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'
    let user
    let sorting = [ ['created_at', 'DESC'] ]

    if (!AdList || !Users || !sequelize) {
        console.error('Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer
        });
    }

    try {
        await getUserAuth(token, Users)
            .then(res => user = res)
            .catch(err => {
                throw err
            })

        if(user.status !== 'active') {
            throw createError({ statusCode: 401, message: 'Неактивный пользователь: статус пользователя: ' + user.status}); // Исправлено: Выбрасываем ошибку
        }
        try {
            if(query.id && query.status) {
                const adItemDB = await requestDBAdPersonalById()
                return formattedAd(adItemDB);
            }

            const adListDB = await requestDBAdPersonalList()

            const result = adListDB.reduce((acc, ad) => {
                switch (ad.status) {
                    case 'draft':
                        acc.ad_draft.push(formattedAd(ad));
                        break;
                    case 'active':
                        acc.ad_active.push(formattedAd(ad));
                        break;
                    case 'archive-success':
                        acc.ad_archive_success.push(formattedAd(ad));
                        break;
                    case 'archive-close':
                        acc.ad_archive_close.push(formattedAd(ad));
                        break;
                    case 'archive':
                        acc.ad_archive.push(formattedAd(ad));
                        break;
                    case 'moderation':
                        acc.ad_moderation.push(formattedAd(ad));
                        break;
                    default:
                        console.warn(`Unknown ad status: ${ad.status} for ad ID: ${ad.id}`);
                        break;
                }

                return acc;
            }, { ad_draft: [], ad_active: [], ad_archive_success: [], ad_archive_close: [], ad_archive: [], ad_moderation: [] });

            return { result }
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

    async function requestDBAdPersonalList() {
        return await AdList.findAll({
            where: {
                owner: user.id
            },
            order: sorting,
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

    async function requestDBAdPersonalById() {
        return await AdList.findOne({
            where: {
                status: query.status,
                id: query.id,
                owner: user.id
            },
            include: [
                {
                    model: Users,
                    as: 'UsersListFavoriteAd',
                    required: false,
                    through: {
                        attributes: [],
                    },
                    where: { id: user.id },
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
        });
    }

});

