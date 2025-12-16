import {formattedBreeders, formattedDogsShort} from "~/server/utils/formattedRequest";

export default defineEventHandler(async (event) => {
    const query: {id: number} = getQuery(event)
    const sequelize = event.context.sequelize;

    const statusMessage = 'Ошибка входа, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    const AdList = event.context.AdList;
    const Dogs = event.context.Dogs;
    const Breeders = event.context.Breeders;
    const Breeds = event.context.Breeds;
    const Users = event.context.Users;
    const GeoRegions = event.context.GeoRegions;
    const GeoCity = event.context.GeoCity;
    const UploadedFile = event.context.UploadedFile;
    const BreedSpecialise = event.context.BreedSpecialise;

    try {
        if (!AdList || !Breeders || !Dogs || !Breeds || !Users || !GeoCity || !GeoRegions || !BreedSpecialise || !sequelize) {
            console.error('Model or sequelize is not available in the context');
            throw createError({
                statusCode: 500,
                message: 'Database connection error',
                statusMessage: statusMessageServer
            });
        }
        console.log('query breeder', query)
        if(query.id) {
            const breederInfo = await requestDBBreeders()
            if(breederInfo) {
                return await formattedBreeders(breederInfo, Users)
            } else {
                throw createError({
                    statusCode: 403,
                    message: 'breeder не существует',
                    statusMessage: statusMessageServer
                });
            }
        } else throw createError({
            statusCode: 403,
            message: 'id не передан',
            statusMessage: statusMessageServer
        });
    } catch (err) {
        throw err;
    }

    async function requestDBBreeders() {
        return await Breeders.findOne({
            where: {
                id: query.id
            },
            include: [
                {
                    model: Dogs,
                    as: 'MyDogs',
                    include: [
                        {
                            model: Breeds,
                            as: 'Breed',
                        },
                        {
                            model: UploadedFile,
                            as: 'DogsPhoto',
                        },
                    ],
                },
                {
                    model: UploadedFile,
                    as: 'BreedersPhotoBanner',
                },
                {
                    model: UploadedFile,
                    as: 'BreedersPhotoPreview',
                },
                {
                    model: UploadedFile,
                    as: 'BreedersPhotoGallery',
                },
                {
                    model: Breeds,
                    as: 'BreedSpecialiseBreeders',
                },
                {
                    model: Users,
                    as: 'OwnerBreeder',
                    include: [
                        {
                            model: GeoCity,
                            as: 'LocationUserCity',
                        },
                        {
                            model: GeoRegions,
                            as: 'LocationUserRegion',
                        },
                        {
                            model: AdList,
                            as: 'UserAdList',
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
                                        purpose: 'ad',
                                    },
                                },
                            ],
                        }
                    ]
                },
            ]
        })
    }
})