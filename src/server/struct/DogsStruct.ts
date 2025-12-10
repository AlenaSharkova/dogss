import {UserBDItemStruct} from "~/server/struct/UserStruct";

export interface DogsBDItemStruct {
    id: number;
    name: string;
    owner: number;
    photos: string[];
    date_birth: string | null;
    breed_id: number;
    gender: 'female' | 'male';
    approximate_age: string | null;
//    created_at: string;


    Breed: object;
//    Owner: UserBDItemStruct;
}
export interface DogsFormatShortItemStruct {
    id: number;
    name: string;
    photos: string[];
    date_birth: string;
    gender: 'female' | 'male';
    approximate_age: string;
//    created_at: string;

    breed: object;
//    ownerDetails: object;

}
export interface DogBodyCreateItemStruct {
    photos: string[];
    name: string;

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
    approximate_age: string | null;
}