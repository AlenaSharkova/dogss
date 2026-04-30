import {AdBDItemStruct, AdFormatShortItemStruct} from "~/server/struct/AdStruct";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import {BreederBDItemStruct} from "~/server/struct/BreedersStruct";
import {getCommentsListUsers} from "~/server/services/comment.service";
import {formattedAd} from "~/server/utils/formattedRequest";
import {AdCommentView} from "~/server/struct/AdCommentStruct";

export interface UserBDFirstItemStruct {

    id: number;
    photo: string;
    address: string;
    status: string;
    email: string;
    city: number;
    region: number;
    first_name: string;
    last_name: string;
    person_ads: number;
    contact_methods: UserContactMethodsOptimalStruct;
}
export interface UserBDItemStruct {

    id: number;
    photo: string;
    address: string;
    status: string;
    email: string;
    city: number;
    region: number;
    first_name: string;
    last_name: string;
    person_ads: number;
    contact_methods: UserContactMethodsOptimalStruct;

    LocationUserCity: object;
    LocationUserRegion: object;
    UserAdList?: AdBDItemStruct[];
    MyBreeder?: BreederBDItemStruct;
}
export interface UserGlobalItemStruct {
    id: number;
    status: string;
    personal_data: {
        photo: string;
        email: string;
        first_name: string;
        last_name: string;
        contact_methods: UserContactMethodsOptimalStruct;
        geo_main: {
            city: object,
            region: object,
            address: string | null,
        }
    },
    ad_list: UserItemPublicAdStruct ,
    comments: AdCommentView[],
}
export interface UserItemPublicAdStruct {
    ad_active: AdFormatShortItemStruct[] | [],
    ad_archive_success: AdFormatShortItemStruct[] | [],
    ad_archive_close: AdFormatShortItemStruct[] | [],
}
export interface UserContactMethodsOptimalStruct {
    email?: string,
    phone?: string,
    tg?: string,
    whatsapp?: string,
    vk?: string,
}
export interface UserCreateItemStruct {
    email: string;
    first_name: string;
    last_name: string;
    region: number,
    city: number,
}