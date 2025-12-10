import {IUploadImageBD, IUploadImageBody} from "~/server/struct/UploadFileStruct";
import {getUserAuth} from "~/server/services/auth.service";
import {BreederBodyCreateStruct} from "~/server/struct/BreedersStruct";
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

    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>
    let user: any


    try {
        if (!AdList || !Breeders || !Dogs || !Breeds || !Users || !UploadedFile || !sequelize) {
            console.error('Model or sequelize is not available in the context');
            throw createError({
                statusCode: 500,
                message: 'Database connection error',
                statusMessage: statusMessageServer
            });
        }
        await getUserAuth(token, Users)
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


        const res = await Breeders.create({
            name: body.name,
            about_text: body.about_text,
            //breed_specialisation: body.breed_specialisation,
            user_id: user.id,
        })

        for (const dog of body.my_dogs) {
            await createDog(dog, res.id)
        }
        if(body.photo_banner) {
            await sendPhoto( body.photo_banner, 'breeder_banner', res.id)
        }
        for (const photo of body.photos_gallery) {
            if(photo) await sendPhoto(photo, 'breeder_gallery', res.id)
        }
        await sendPhoto(body.photo_preview, 'breeder_preview', res?.id)
        return res;
    } catch (error) {
        console.log('Ошибка при создании объявления', error)
        throw createError({
            statusCode: 400,
            message: JSON.stringify(error),
            statusMessage: 'Ошибка при создании объявления',
        })
        throw error;
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
        Dogs.create(fields);
    }

})