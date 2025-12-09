import {UserBDItemStruct} from "~/server/struct/UserStruct";

export interface DogsBDItemStruct {
    id: number;
    name: string;
    owner: number;
    photos: string[];
    date_birth: string;
    breed_id: string;
    gender: 'female' | 'male' | 'any' | null;
    approximate_age: string;
//    created_at: string;


    Breed: object;
//    Owner: UserBDItemStruct;
}
export interface DogsFormatShortItemStruct {
    id: number;
    name: string;
    photos: string[];
    date_birth: string;
    gender: 'female' | 'male' | 'any' | null;
    approximate_age: string;
//    created_at: string;

    breed: object;
//    ownerDetails: object;

}
export interface DogBodyCreateItemStruct {
    photos: string[];
    name: string;
    //owner: number;

    date_birth: string | null;
    breed_id: number;
    gender: 'female' | 'male' | 'any';
    approximate_age: string | null;
}