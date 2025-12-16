import {IUploadImageBD, IUploadImageBody} from "~/server/struct/UploadFileStruct";
import {getUserAuth} from "~/server/services/auth.service";
import {BreederBDItemStruct, BreederBodyCreateStruct} from "~/server/struct/BreedersStruct";
import {DogBodyCreateItemStruct, DogFieldsCreateItemStruct, DogsBDItemStruct} from "~/server/struct/DogsStruct";

export default defineEventHandler(async (event) => {
    const sequelize = event.context.sequelize;
    const body: BreederBodyCreateStruct  = await readBody(event)

    const statusMessage = 'Ошибка входа, попробуйте ещё раз'
    const statusMessageServer = 'Ошибка сервера, попробуйте позже'

    const AdList = event.context.AdList;
    const Dogs = event.context.Dogs;
    const Breeders = event.context.Breeders;
    const Breeds = event.context.Breeds;
    const UploadedFile = event.context.UploadedFile;
    const Users = event.context.Users;
    const BreedSpecialise = event.context.BreedSpecialise;

    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>
    let user: any
    let breederEdition
    let transaction;


    try {
        if (!AdList || !Breeders || !Dogs || !Breeds || !Users || !UploadedFile || !BreedSpecialise || !sequelize) {
            console.error('Model or sequelize is not available in the context');
            throw createError({
                statusCode: 500,
                message: 'Database connection error',
                statusMessage: statusMessageServer
            });
        }
        const includeUserList = [{
            model: Breeders,
            as: 'MyBreeder',
        }]
        await getUserAuth(token, Users, includeUserList)
            .then(res => user = res)
            .catch(err => {
                throw err
            })

        if (!user) {
            console.error(`Пользователь с не найден!`);
            throw createError({
                statusCode: 401,
                message: `Пользователь не найден!`,
            });
        }
        if (!user.MyBreeder) {
            throw createError({
                statusCode: 403,
                message: `Питомник Пользователя не найден`,
                statusMessage: `Питомник Пользователя не найден`,
            });
        }
        transaction = await sequelize.transaction();

        breederEdition = await requestDBBreeders(body.id, transaction)
        if(!breederEdition) {
            throw createError({
                statusCode: 500,
                message: `Питомник не найден`,
                statusMessage: `Питомник не найден`,
            });
        }
        //breederCreated = res
        const breederFieldsToUpdate: any = {};
        if (body.name) breederFieldsToUpdate.name = body.name;
        if (body.about_text) breederFieldsToUpdate.about_text = body.about_text;
        // Добавьте сюда все остальные поля, которые мо
        if (Object.keys(breederFieldsToUpdate).length > 0) {
            await Breeders.update(breederFieldsToUpdate, {
                where: { id: body.id },
                transaction
            });
        }
        if( body.breed_specialisation?.length) {
             // текущее фото
            await patchSpecialiseBreeders(transaction, breederEdition.BreedSpecialiseBreeders)
        }

        if(body.photo_banner !== undefined) {
            //если удалили присылать null
            await handleSinglePhotoUpdate(
                body.photo_banner,
                breederEdition.BreedersPhotoBanner, // текущее фото
                'breeder_banner',
                body.id,
                user.id,
                transaction
            );
        }
        if(body.photos_gallery !== undefined) {
            await handleGalleryPhotosUpdate(
                body.photos_gallery,
                breederEdition.BreedersPhotoGallery,
                'breeder_gallery',
                body.id,
                user.id,
                transaction
            );
        }
        if(body.photo_preview) {
            await handleSinglePhotoUpdate(
                body.photo_preview,
                breederEdition.BreedersPhotoPreview, // текущее фото
                'breeder_preview',
                body.id,
                user.id,
                transaction
            );
        }
        if (body.my_dogs !== undefined) {
            await handleDogsUpdate(
                body.my_dogs,
                breederEdition.MyDogs,
                body.id,
                user.id,
                transaction
            );
        }
        await transaction.commit();

        return breederEdition
    } catch (error) {

        console.log('Ошибка при редактировании объявления', error)
        throw createError({
            statusCode: 400,
            message: JSON.stringify(error),
            statusMessage: 'Ошибка при создании объявления',
        })
        throw error;
    }

    async function patchSpecialiseBreeders(
        transaction: any,
        currentSpecializationsBD: any
    ) {
        console.log('currentSpecializationsBD')
        const currentBreedIds = new Set(currentSpecializationsBD.map(s => s.breed_specialise_id));
        const newBreedIds = new Set(body.breed_specialisation);
        const toAdd = [...newBreedIds].filter(id => !currentBreedIds.has(id));
        const toRemove = [...currentBreedIds].filter(id => !newBreedIds.has(id));
        // Добавить новые специализации
        if (toAdd.length > 0) {
            await BreedSpecialise.bulkCreate(toAdd.map(breed_id => ({
                breeder_id: body.id,
                breed_specialise_id: breed_id
            })));
        }
        // Удалить отсутствующие специализации
        if (toRemove.length > 0) {
            await BreedSpecialise.destroy({
                where: {
                    breeder_id: body.id,
                    breed_specialise_id: toRemove
                }
            });
        }
    }
    async function sendPhoto(photo: IUploadImageBody, purpose: string, source_id: number) {
        return await UploadedFile.create({
            url: photo.url,
            typeFile: 'image',
            purpose: purpose,
            owner: user.id,
            coordinates: photo.coordinates,
            positionBanner: photo.positionBanner,
            source_id: source_id,
        });
    }
    async function requestDBBreeders(id: number, transaction?: any) {
        return await Breeders.findOne({
            where: {
                id: id
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
            ],
            transaction
        })
    }
    async function createDog(dogs: DogBodyCreateItemStruct, breederId: number) {
        const fields: DogFieldsCreateItemStruct = {
            name: dogs.name,
            owner: user.id,
            date_birth: dogs.date_birth,
            breed_id: dogs.breed_id,
            breeder_id: breederId,
            gender: dogs.gender,
            approximate_age: dogs.approximate_age
        }
        const dogBd = Dogs.create(fields);
        for (const photo of dogs.photos) {
            await sendPhoto(photo, 'dogs', dogBd.id)
        }
    }



    //для фото
    // Вспомогательная функция для создания записи файла
    async function createUploadedFile(
        photoData: IUploadImageBody,
        purpose: string,
        source_id: number,
        owner_id: number,
        transaction: any
    ) {
        return await UploadedFile.create({
            url: photoData.url,
            typeFile: 'image',
            purpose: purpose,
            owner: owner_id,
            coordinates: photoData.coordinates,
            positionBanner: photoData.positionBanner,
            source_id: source_id,
        }, { transaction });
    }

// Вспомогательная функция для удаления записи файла
    async function deleteUploadedFile(fileId: number, transaction: any) {
        await UploadedFile.destroy({
            where: { id: fileId },
            transaction
        });
    }

// Вспомогательная функция для обновления метаданных файла
    async function updateUploadedFileMetadata(
        fileId: number,
        photoData: IUploadImageBody,
        transaction: any
    ) {
        await UploadedFile.update({
            coordinates: photoData.coordinates,
            positionBanner: photoData.positionBanner,
        }, {
            where: { id: fileId },
            transaction
        });
    }

// Обработка одиночной фотографии (баннер, превью)
    async function handleSinglePhotoUpdate(
        newPhoto: IUploadImageBody | null | undefined, // Может быть null, если удалили фото
        currentPhoto: any, // Текущая запись UploadedFile из БД
        purpose: string,
        source_id: number,
        owner_id: number,
        transaction: any
    ) {
        if (newPhoto) { // Если пришло новое фото
            if (currentPhoto) { // Если уже есть фото в БД
                if (currentPhoto.url !== newPhoto.url) { // URL изменился, нужно удалить старое и создать новое
                    await deleteUploadedFile(currentPhoto.id, transaction);
                    await createUploadedFile(newPhoto, purpose, source_id, owner_id, transaction);
                } else { // URL тот же, возможно, обновились метаданные (координаты, позиция)
                    await updateUploadedFileMetadata(currentPhoto.id, newPhoto, transaction);
                }
            } else { // Нет текущего фото, просто создаем новое
                await createUploadedFile(newPhoto, purpose, source_id, owner_id, transaction);
            }
        } else if (currentPhoto) { // Если новое фото null/undefined, но в БД оно есть, значит, его удалили
            await deleteUploadedFile(currentPhoto.id, transaction);
        }
        // Если оба null/undefined, ничего не делаем
    }

// Обработка фотографий галереи
    async function handleGalleryPhotosUpdate(
        newPhotos: IUploadImageBody[], // Массив новых фотографий из body
        currentPhotos: any[], // Массив текущих фотографий из БД
        purpose: string,
        source_id: number,
        owner_id: number,
        transaction: any
    ) {
        const currentPhotoIds = new Set(currentPhotos.map(p => p.id));
        const newPhotoIds = new Set(newPhotos.filter(p => p.id).map(p => p.id)); // ID, которые пришли из клиента

        const photosToAdd = newPhotos.filter(p => !p.id || !currentPhotoIds.has(p.id));
        const photosToUpdate = newPhotos.filter(p => p.id && currentPhotoIds.has(p.id));
        const photosToRemove = currentPhotos.filter(p => !newPhotoIds.has(p.id));

        // Удалить отсутствующие фото
        if (photosToRemove.length > 0) {
            await UploadedFile.destroy({
                where: { id: photosToRemove.map(p => p.id) },
                transaction
            });
        }

        // Добавить новые фото
        if (photosToAdd.length > 0) {
            await UploadedFile.bulkCreate(photosToAdd.map(photo => ({
                url: photo.url,
                typeFile: 'image',
                purpose: purpose,
                owner: owner_id,
                coordinates: photo.coordinates,
                positionBanner: photo.positionBanner,
                source_id: source_id,
            })), { transaction });
        }

        // Обновить существующие фото (метаданные)
        for (const photo of photosToUpdate) {
            const currentPhoto = currentPhotos.find(p => p.id === photo.id);
            if (currentPhoto && (currentPhoto.url !== photo.url || currentPhoto.coordinates !== photo.coordinates || currentPhoto.positionBanner !== photo.positionBanner)) {
                // Если URL изменился, удаляем старое и создаем новое (или просто обновляем запись, если это только метаданные)
                // Для URL чаще всего безопаснее удалить и создать, так как URL часто уникален для файла.
                // Если URL тот же, но метаданные другие, то просто обновляем.
                if (currentPhoto.url !== photo.url) {
                    await deleteUploadedFile(currentPhoto.id, transaction);
                    await createUploadedFile(photo, purpose, source_id, owner_id, transaction);
                } else {
                    await updateUploadedFileMetadata(photo.id!, photo, transaction);
                }
            }
        }
    }

    // Вспомогательная функция для создания собаки
    async function createDogEntry(
        dogData: DogBodyCreateItemStruct,
        breederId: number,
        owner_id: number,
        transaction: any
    ) {
        const dogFields: DogFieldsCreateItemStruct = { // Предполагается, что у вас есть этот тип
            name: dogData.name,
            owner: owner_id,
            date_birth: dogData.date_birth,
            breed_id: dogData.breed_id,
            breeder_id: breederId,
            gender: dogData.gender,
            approximate_age: dogData.approximate_age
        };
        const dog = await Dogs.create(dogFields, { transaction });

        // Создаем фотографии для новой собаки
        if (dogData.photos && dogData.photos.length > 0) {
            await UploadedFile.bulkCreate(dogData.photos.map(photo => ({
                url: photo.url,
                typeFile: 'image',
                purpose: 'dogs', // Укажите соответствующий purpose
                owner: owner_id,
                coordinates: photo.coordinates,
                positionBanner: photo.positionBanner,
                source_id: dog.id, // ID новой собаки
            })), { transaction });
        }
        return dog;
    }

// Вспомогательная функция для обновления собаки
    async function updateDogEntry(
        dogId: number,
        dogData: DogBodyCreateItemStruct,
        owner_id: number,
        transaction: any
    ) {
        const dogFieldsToUpdate: any = {
            name: dogData.name,
            date_birth: dogData.date_birth,
            breed_id: dogData.breed_id,
            gender: dogData.gender,
            approximate_age: dogData.approximate_age
            // owner и breeder_id обычно не меняются при обновлении
        };
        await Dogs.update(dogFieldsToUpdate, {
            where: { id: dogId },
            transaction
        });
    }

// Вспомогательная функция для удаления собаки и ее фото
    async function deleteDogEntry(dogId: number, transaction: any) {
        // Сначала удаляем все фотографии, связанные с собакой
        await UploadedFile.destroy({
            where: { source_id: dogId, purpose: 'dog_photo' }, // Убедитесь, что purpose совпадает
            transaction
        });
        // Затем удаляем саму собаку
        await Dogs.destroy({
            where: { id: dogId },
            transaction
        });
    }

// Обработка списка собак
    async function handleDogsUpdate(
        newDogs: DogBodyCreateItemStruct[], // Массив новых собак из body
        currentDogs: any[], // Массив текущих собак из БД (currentBreeder.MyDogs)
        breederId: number,
        owner_id: number,
        transaction: any
    ) {
        const currentDogIds = new Set(currentDogs.map(d => d.id));
        const newDogIds = new Set(newDogs.filter(d => d.id).map(d => d.id)); // ID, которые пришли из клиента

        const dogsToAdd = newDogs.filter(d => !d.id || !currentDogIds.has(d.id));
        const dogsToUpdate = newDogs.filter(d => d.id && currentDogIds.has(d.id));
        const dogsToRemove = currentDogs.filter(d => !newDogIds.has(d.id));

        // Удалить отсутствующие собаки
        for (const dog of dogsToRemove) {
            await deleteDogEntry(dog.id, transaction);
        }

        // Добавить новые собаки
        for (const dog of dogsToAdd) {
            await createDogEntry(dog, breederId, owner_id, transaction);
        }

        // Обновить существующие собаки
        for (const dogData of dogsToUpdate) {
            await updateDogEntry(dogData.id!, dogData, owner_id, transaction);

            // Также нужно обновить фотографии для каждой собаки
            const currentDog = currentDogs.find(d => d.id === dogData.id);
            if (currentDog) {
                await handleGalleryPhotosUpdate( // Переиспользуем логику для галереи
                    dogData.photos,
                    currentDog.DogsPhoto, // Предполагаем, что currentDog.DogsPhoto содержит массив UploadedFile
                    'dog_photo', // Цель для фото собак
                    dogData.id!, // ID собаки как source_id
                    owner_id,
                    transaction
                );
            }
        }
    }


})