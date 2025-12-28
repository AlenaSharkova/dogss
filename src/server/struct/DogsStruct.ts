import {UserBDItemStruct} from "~/server/struct/UserStruct";
import {IUploadImageBD, IUploadImageBody} from "~/server/struct/UploadFileStruct";

export interface DogsBDItemStruct {
    id: number;
    name: string;
    owner: number;
    photos: IUploadImageBD[];
    date_birth: string | null;
    breed_id: number;
    gender: 'female' | 'male';
    approximate_age: string | null;
//    created_at: string;

    DogsPhoto: IUploadImageBD[]
    Breed: object;
//    Owner: UserBDItemStruct;
}
export interface DogsFormatShortItemStruct {
    id: number;
    name: string;
    photos: IUploadImageBD[];
    date_birth: string | null;
    gender: 'female' | 'male';
    approximate_age: string | null;
//    created_at: string;

    breed: object;
//    ownerDetails: object;

}
export interface DogBodyCreateItemStruct {
    photos: IUploadImageBody[];
    name: string;
    id?: number;
    date_birth: string | null;
    breed_id: number;
    gender: 'female' | 'male';
    approximate_age: string | null;
}
export interface DogFieldsCreateItemStruct {
    name: string;
    date_birth: string | null;
    breed_id: number;
    gender: 'female' | 'male';
    breeder_id: number;
    owner: number;
    approximate_age: string | null;
}