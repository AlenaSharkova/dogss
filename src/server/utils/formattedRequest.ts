import {AdBDItemStruct, AdFormatShortItemStruct} from "~/server/struct/AdStruct.js";
import {UserBDItemStruct, UserGlobalItemStruct} from "~/server/struct/UserStruct";
import type {UserItemPublicAdStruct} from "~/server/struct/UserStruct";
import {getCommentsListUsers} from "~/server/services/comment.service";
import {DogsBDItemStruct, DogsFormatShortItemStruct} from "~/server/struct/DogsStruct";
import {BreederBDItemStruct, BreederItemStruct} from "~/server/struct/BreedersStruct";
import {IUploadImageBD, IUploadImageBody} from "~/server/struct/UploadFileStruct";
import {ISelectNumber} from "~/server/struct/CommonStruct";

export const formattedUserGlobal = async (user: UserBDItemStruct, UsersModel: any): Promise<UserGlobalItemStruct> => {
    return {
        id: user.id,
        status: user.status,
        personal_data: {
            email: user.email,
            last_name: user.last_name,
            photo: user.photo,
            first_name: user.first_name,
            contact_methods: user.contact_methods,
            geo_main: {
                city: user.LocationUserCity,
                region: user.LocationUserRegion,
                address: user.address,
            }
        },
        ad_list: user.UserAdList? user.UserAdList.reduce((list: UserItemPublicAdStruct, ad) => {
                if (ad.status === 'active') list.ad_active.push(formattedAd(ad))
                if (ad.status === 'archive-success') list.ad_archive_success.push(formattedAd(ad))
                if (ad.status === 'archive-close') list.ad_archive_close.push(formattedAd(ad))
                return list
            }, {
                ad_active: [],
                ad_archive_success: [],
                ad_archive_close: [],
            }): {
                ad_active: [],
                ad_archive_success: [],
                ad_archive_close: [],
            },
        comments: await getCommentsListUsers(user, UsersModel),
        breeder: user.MyBreeder
    };
}
export const formattedUserGlobalForAdItem = (user: UserBDItemStruct) => {
    return {
        id: user.id,
        status: user.status,
        personal_data: {
            email: user.email,
            id: user.id,
            last_name: user.last_name,
            photo: user.photo,
            first_name: user.first_name,
            contact_methods: user.contact_methods,
            status: user.status,
        },
        ad_list_count: {
            active: (user.UserAdList?.filter((ad) => ad.status === 'active') || [] ).length,
            archive_success: (user.UserAdList?.filter((ad) => ad.status === 'archive-success')|| []).length,
            archive_close: (user.UserAdList?.filter((ad) => ad.status === 'archive-close')|| []).length,
        },
        comments_count: (user.UserAdList?.filter((ad) => ad.rating_commenter) || []).length
    };
}
export const formattedUserGlobalShort = (user: UserBDItemStruct) => {
    return {
        id: user.id,
        status: user.status,
        personal_data: {
            email: user.email,
            id: user.id,
            last_name: user.last_name,
            photo: user.photo,
            first_name: user.first_name,
            status: user.status,
            geo_main: {
                city: user.LocationUserCity,
                region: user.LocationUserRegion,
                address: user.address,
            }
        },
        breeder: user.MyBreeder
    };
}
export const formattedUserAuth = (user: UserBDItemStruct) => {
    return {
        id: user.id,
        status: user.status,
        personal_data: {
            email: user.email,
            id: user.id,
            last_name: user.last_name,
            photo: user.photo,
            first_name: user.first_name,
            contact_methods: user.contact_methods,
            status: user.status,
            geo_main: {
                city: user.LocationUserCity,
                region: user.LocationUserRegion,
                address: user.address,
            }
        },
        id_breeder: user.MyBreeder?.id || null
    };
}
export const formattedImageUploadAd = (item: IUploadImageBD): IUploadImageBody => {
    return {
        url: item.url,
        coordinates: item.coordinates,
        positionBanner: item.positionBanner,
    }
}
export const formattedAdShort = (item: AdBDItemStruct): AdFormatShortItemStruct => {
    return {
        id: item.id,
        created_at: item.created_at,
        date_birth: item.date_birth,
        gender: item.gender,
        name: item.name,
        price: item.price,
        quantitative: item.quantitative,
        number_male: item.number_male,
        number_female: item.number_female,
        approximate_age: item.approximate_age,
        is_contractual_price: item.is_contractual_price,
        photos: item.PhotosObject.map(img => formattedImageUploadAd(img)),
        region_main: item.region_main,
        city_main: item.city_main,
        geo_main: {
            region: item.LocationRegion,
            city: item.LocationCity,
            // city: adCityMain[0],
        },
        /*geo_main: {
            region: adRegionMain[0],
            city: adCityMain[0],
        },*/
        status: item.status,
        type_ad: item.type_ad,
        //необязательно для листинга
        description: item.description,

        parents: {
            parents_dad: item.parents_dad,
            parents_mum: item.parents_mum,
        },
        //временнно
        //

        //breed: item.breeds,
        breed: item.Breed,
        exportRegions: {
            isExport: item.is_export,
            regionsList: item.ExportRegions
            //regionsList: item.GeoRegions
        },
        ownerDetails: formattedUserGlobalShort(item.Owner),
        isFavorite: !!item.UsersListFavoriteAd?.length,
        UsersListFavoriteAd: item.UsersListFavoriteAd,

    }
}
export const formattedAd = (item: AdBDItemStruct): AdFormatShortItemStruct => {
    return {
        id: item.id,
        created_at: item.created_at,
        date_birth: item.date_birth,
        gender: item.gender,
        name: item.name,
        price: item.price,
        quantitative: item.quantitative,
        number_male: item.number_male,
        number_female: item.number_female,
        approximate_age: item.approximate_age,
        is_contractual_price: item.is_contractual_price,
        photos: item.PhotosObject.map(img => formattedImageUploadAd(img)),
        region_main: item.region_main,
        city_main: item.city_main,
        geo_main: {
            region: item.LocationRegion,
            city: item.LocationCity,
            // city: adCityMain[0],
        },
        /*geo_main: {
            region: adRegionMain[0],
            city: adCityMain[0],
        },*/
        status: item.status,
        type_ad: item.type_ad,
        //необязательно для листинга
        description: item.description,

        parents: {
            parents_dad: item.parents_dad,
            parents_mum: item.parents_mum,
        },
        //временнно
        //img: item.img,
        //

        //breed: item.breeds,
        breed: item.Breed,
        exportRegions: {
            isExport: item.is_export,
            regionsList: item.ExportRegions
            //regionsList: item.GeoRegions
        },
        ownerDetails: formattedUserGlobalForAdItem(item.Owner),
        isFavorite: !!item.UsersListFavoriteAd?.length,
        UsersListFavoriteAd: item.UsersListFavoriteAd,
        PhotosObject: item.PhotosObject,
    }
}

export const formattedDogsShort = (item: DogsBDItemStruct): DogsFormatShortItemStruct => {
    return {
        id: item.id,
        //created_at: item.created_at,
        date_birth: item.date_birth,
        gender: item.gender,
        name: item.name,
        approximate_age: item.approximate_age,
        photos: item.DogsPhoto,
        //photos: item.photos,
        //временнно
        //

        //breed: item.breeds,
        breed: item.Breed,
//        ownerDetails: formattedUserGlobalShort(item.Owner),
    }
}

export const formattedBreeders = async (item: BreederBDItemStruct, UsersModel: any): BreederItemStruct => {
    console.log('item BreedersPhotoBanner', item.BreedersPhotoBanner, item.BreedersPhotoGallery, item.BreedersPhotoPreview)
    return {
        id: item.id,
        //created_at: item.created_at,
        name: item.name,
        photos_gallery: item.BreedersPhotoGallery.map(item => formattedPhoto(item)),
        photo_banner: formattedPhoto(item.BreedersPhotoBanner, false, true),
        photo_preview: formattedPhoto(item.BreedersPhotoPreview, true),
        created_ad: item.created_ad,
        about_text: item.about_text,
        breed_specialisation: item.BreedSpecialiseBreeders?.map(item => {
            return {
                text: item.text,
                value: item.value
            }
        }),
        my_dogs: item.MyDogs.map((item: DogsBDItemStruct) => formattedDogsShort(item)),
        ownerDetails: item.OwnerBreeder ? await formattedUserGlobal(item.OwnerBreeder, UsersModel) : null,
        MyDogs: item.MyDogs
    }
}

export const formattedPhoto = (item: IUploadImageBD, isCoordinates = false, isPositionBanner = false): IUploadImageBody => {
    console.log('item formattedPhoto', item)
    const data: IUploadImageBody = {
        url: item.url,
    }
    if(isCoordinates) data.coordinates = item.coordinates;
    if(isPositionBanner) data.positionBanner = item.positionBanner;
    return data
}
