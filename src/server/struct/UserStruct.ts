import {AdBDItemStruct, AdFormatShortItemStruct} from "~/server/struct/AdStruct";

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
    active: AdFormatShortItemStruct[],
    archive: AdFormatShortItemStruct[]
}
export interface UserContactMethodsOptimalStruct {
    email?: string,
    phone?: string,
    tg?: string,
    whatsapp?: string,
    vk?: string,
}