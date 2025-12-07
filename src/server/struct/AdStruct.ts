import {UserBDItemStruct} from "~/server/struct/UserStruct";
import {IUploadImageBD, IUploadImageBody} from "~/server/struct/UploadFileStruct";

export interface AdBDItemStruct {
    id: number;
    name: string;
    price: number;
    status: string;
    owner: number;
    photos: string[];
    breed: string;
    date_birth: string;
    count_image: number;
    breed_id: string;
    type_ad: string;
    description: string;
    is_export: boolean;
    parents_mum: number
    parents_dad: number;
    region_main: number;
    city_main: number;
    gender: 'female' | 'male' | 'any' | null;
    quantitative: 'one' | 'litter';
    number_male: number;
    number_female: number;
    approximate_age: string;
    is_contractual_price: boolean;
    created_at: string;

    hash_link_comment: string;
    text_comment: string;
    rating_commenter: number;
    id_user_commenter: number;
    expires_at_hash_link_comment: string;

    LocationRegion: object;
    LocationCity: object;
    Breed: object;
    Owner: UserBDItemStruct;
    ExportRegions: object;
    UsersListFavoriteAd: object[];
    PhotosObject: IUploadImageBD[];
}
export interface AdFormatShortItemStruct {
    id: number;
    name: string;
    price: number;
    status: string;
    photos: IUploadImageBody[];
    date_birth: string;
    type_ad: string;
    description: string;
    region_main: number;
    city_main: number;
    gender: 'female' | 'male' | 'any' | null;
    quantitative: 'one' | 'litter';
    number_male: number;
    number_female: number;
    approximate_age: string;
    is_contractual_price: boolean;
    created_at: string;
    geo_main: {
        region: object,
        city: object,
        // city: adCityMain[0],
    },
    parents: {
        parents_dad: number,
        parents_mum: number,
    }

    breed: object;
    exportRegions: {
        isExport: boolean,
        regionsList: object
    };
    isFavorite: boolean
    ownerDetails: object;
    UsersListFavoriteAd: object;
}
export interface AdQueryAdminStruct {
    status: string;
    id: string;
}

export interface AdAdminListStruct {
    moderation: AdFormatShortItemStruct[],
    blocked: AdFormatShortItemStruct[],
    draft: AdFormatShortItemStruct[],

}