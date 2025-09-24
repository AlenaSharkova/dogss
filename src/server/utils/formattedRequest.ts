import {AdBDItemStruct, AdFormatShortItemStruct} from "~/server/struct/AdStruct.js";
import {UserBDItemStruct} from "~/server/struct/UserStruct";
import type {UserItemPublicAdStruct} from "~/server/struct/UserStruct";
import {AdCommentView} from "~/server/struct/AdCommentStruct";

export const formattedUserGlobal = (user: UserBDItemStruct) => {
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
        ad_list: user.UserAdList.reduce((list: UserItemPublicAdStruct, ad) => {
                if (ad.status === 'active') list.active.push(formattedAd(ad))
                if (ad.status === 'archive') list.archive.push(formattedAd(ad))
                return list
            }, {
                active: [],
                archive: [],
            }),
        comments: user.UserAdList.reduce((list: AdCommentView[], ad) => {
            console.log('ad.rating_commenter000', ad.rating_commenter)
            if (ad.rating_commenter) {
                list.push({
                    id_user: ad.id_user_commenter,
                    ad_info: {
                        id: ad.id,
                        name: ad.name
                    },
                    text: ad.text_comment || '',
                    rating: ad.rating_commenter,
                })
            }
            return list
        }, []),
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
            archive: (user.UserAdList?.filter((ad) => ad.status === 'archive')|| []).length,
        }
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
        }
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
        }
    };
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
        photos: item.photos,
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
        photos: item.photos,
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
    }
}