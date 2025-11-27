import type {DogCreateItemStruct, DogFormCreateItemStruct, DogShortItemStruct} from "~/struct/Dog/DogItemStruct";

export type BreederSiteSectionType = 'about' | 'ads' | 'contacts' | 'comments' | 'my-dogs'


export interface BreederSiteItemStruct {
    id: number;
    name: string;
    photo_banner: string;
    photos_gallery: string[];
    my_dogs: DogShortItemStruct[];
    created_ad: string;
}
export interface BreederSiteSaveStruct {
    id: number;
    name: string;
    photo_banner: string;
    photos_gallery: string[];
    my_dogs: DogCreateItemStruct;
}
export interface BreederSiteChangeStruct {
    name: string;
    photo_banner: string | null;
    photos_gallery: string[] | null;
    my_dogs: DogCreateItemStruct | null;
    id: number
}