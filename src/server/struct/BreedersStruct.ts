import {UserBDItemStruct} from "~/server/struct/UserStruct";
import {DogsBDItemStruct, DogsFormatShortItemStruct} from "~/server/struct/DogsStruct";

export interface BreederBDItemStruct {
    id: number;
    name: string;
    photo_banner: string;
    photos_gallery: string[];
    my_dogs: number[];
    created_ad: string;

    MyDogs: DogsBDItemStruct[];
//    created_at: string;


//    Owner: UserBDItemStruct;
}
export interface BreederItemStruct {
    id: number;
    name: string;
    photo_banner: string;
    photos_gallery: string[];
    my_dogs: DogsFormatShortItemStruct[];
    created_ad: string;
}