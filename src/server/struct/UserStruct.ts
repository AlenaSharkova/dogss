import {AdBDItemStruct, AdFormatShortItemStruct} from "~/server/struct/AdStruct";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";

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
    UserAdList: AdBDItemStruct[];
}
export interface UserItemPublicAdStruct {
    ad_active: AdFormatShortItemStruct[],
    ad_archive_success: AdFormatShortItemStruct[],
    ad_archive_close: AdFormatShortItemStruct[],
}
export interface UserContactMethodsOptimalStruct {
    email?: string,
    phone?: string,
    tg?: string,
    whatsapp?: string,
    vk?: string,
}