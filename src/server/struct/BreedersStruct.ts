import {UserBDItemStruct, UserGlobalItemStruct} from "~/server/struct/UserStruct";
import {DogBodyCreateItemStruct, DogsBDItemStruct, DogsFormatShortItemStruct} from "~/server/struct/DogsStruct";
import type {UserItemPublicPreviewStruct} from "~/struct/User/UserItemStruct";
import type {IUploadImageInBase} from "~/struct/Common/ICommonUpload";
import type {DogCreateItemStruct} from "~/struct/Dog/DogItemStruct";
import {IUploadImageBD, IUploadImageBody} from "~/server/struct/UploadFileStruct";
import {ISelectNumber} from "~/server/struct/CommonStruct";

export interface BreederBDItemStruct {
    id: number;
    name: string;
    photo_banner: string;
    photos_gallery: string[];
    my_dogs: number[];
    created_ad: string;
    user_id: number;
    about_text: string;

    MyDogs: DogsBDItemStruct[];
    BreedersPhotoBanner: IUploadImageBD;
    BreedersPhotoPreview: IUploadImageBD;
    BreedersPhotoGallery: IUploadImageBD[];
    BreedSpecialiseBreeders: any[];
    OwnerBreeder?: UserBDItemStruct;
//    created_at: string;
//    Owner: UserBDItemStruct;

}
export interface BreederItemStruct {
    id: number;
    name: string;
    photo_banner: IUploadImageBody;
    photos_gallery: IUploadImageBody[];
    photo_preview: IUploadImageBody;
    my_dogs: DogsFormatShortItemStruct[];
    created_ad: string;
    breed_specialisation: ISelectNumber[];
    about_text: string;
    ownerDetails: UserGlobalItemStruct | null;
}
export interface BreederItemForUserStruct {
    //то же, что и BreederItemStruct, но без ownerDetails
    id: number;
    name: string;
    photo_banner: IUploadImageBody;
    photos_gallery: IUploadImageBody[];
    photo_preview: IUploadImageBody;
    my_dogs: DogsFormatShortItemStruct[];
    created_ad: string;
    breed_specialisation: ISelectNumber[];
    about_text: string;
    //ownerDetails: UserGlobalItemStruct | null;
}
export interface BreederItemShortForUserStruct {
    // без ownerDetails, photo_banner, photos_gallery, my_dogs, about_text
    id: number;
    name: string;
    //photo_banner: IUploadImageBody;
    //photos_gallery: IUploadImageBody[];
    photo_preview: IUploadImageBody;
    //my_dogs: DogsFormatShortItemStruct[];
    created_ad: string;
    breed_specialisation: ISelectNumber[];
    //about_text: string;
    //ownerDetails: UserGlobalItemStruct | null;
}
export interface BreederBodyCreateStruct {
    id: number;
    name: string;
    photo_banner: IUploadImageBody | null;
    photos_gallery: IUploadImageBody[];
    my_dogs: DogBodyCreateItemStruct[];
    photo_preview: IUploadImageBody;
    breed_specialisation: number[];
    about_text: string | null;
}