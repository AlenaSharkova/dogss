import type {DogCreateItemStruct, DogFormCreateItemStruct, DogShortItemStruct} from "~/struct/Dog/DogItemStruct";
import {type UserGlobalItemStruct} from "~/server/struct/UserStruct";
import type {ISelectComponent} from "~/struct/Common/ISelectComponent";
import type {ICommonUpload, IUploadImageInBase} from "~/struct/Common/ICommonUpload";

export type BreederSiteSectionType = 'about' | 'ads' | 'contacts' | 'comments' | 'my-dogs'


export interface BreederShortsItemStruct {
    id: number;
    name: string;
    photo_preview: string;
}
export interface BreederSiteItemStruct {
    id: number;
    name: string;
    photo_banner: IUploadImageInBase;
    photos_gallery: IUploadImageInBase[];
    my_dogs: DogShortItemStruct[];
    created_ad: string;
    ownerDetails: UserGlobalItemStruct | null;
    photo_preview: IUploadImageInBase;
    breed_specialisation: ISelectComponent[];
    about_text: string | null;
}
export interface BreederSiteManageStruct {
    name: string | null;
    photo_banner: ICommonUpload | null;
    photos_gallery: ICommonUpload[] | [];
    my_dogs: DogCreateItemStruct[] | null;
    photo_preview: ICommonUpload | null;
    breed_specialisation: ISelectComponent[];
    about_text: string | null;
    id?: number;
}
export interface BreederSiteSaveStruct {
    name: string;
    photo_banner: IUploadImageInBase | null;
    photos_gallery: IUploadImageInBase[];
    my_dogs: DogCreateItemStruct;
    photo_preview: IUploadImageInBase;
    breed_specialisation: number[];
    about_text: string | null;
}
export interface BreederSiteChangeStruct {
    name?: string;
    photo_banner?: string | null;
    photos_gallery?: string[] | null;
    my_dogs?: DogCreateItemStruct | null;
    photo_preview?: string;
    breed_specialisation?: number[] | null;
    about_text?: string;
}