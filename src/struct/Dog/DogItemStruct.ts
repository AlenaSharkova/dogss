import type {
    ISelectComponent,
    ISelectComponentWithChildren,
    ISelectNumber,
    ISelectNumberRequired
} from "~/struct/Common/ISelectComponent";
import type {IStatusAd} from "~/struct/Common/IValueType";
import type {UserItemPublicPreviewStruct} from "~/struct/User/UserItemStruct";
import type {ICommonUpload} from "~/struct/Common/ICommonUpload";


export interface DogItemStruct {
    breed: ISelectNumberRequired;
    name: string;
    photos: ICommonUpload[];
    id: number;
    //ownerDetails: UserItemPublicPreviewStruct;

    date_birth: string | null;
    //created_at: string;

    gender: 'female' | 'male';
    approximate_age: string | null;
}
export interface DogShortItemStruct {
    breed: ISelectNumberRequired;
    name: string;
    photos: ICommonUpload[];
    id: number;
    //ownerDetails: UserItemPublicPreviewStruct;

    date_birth: string | null;
    //created_at: string;

    gender: 'female' | 'male';
    approximate_age: string | null;
}

export interface DogFormCreateItemStruct {
    breed: ISelectNumberRequired;
    id?: number;

    name: string;
    photos: ICommonUpload[];

    date_birth: string | null;
    gender: 'female' | 'male';
    approximate_age: string | null;
    status_update?: 'add'
    //прочее
}

export interface DogCreateItemStruct {
    photos: string[];
    name: string;
    //owner: number;

    date_birth: string | null;
    breed_id: number;
    gender: 'female' | 'male' | 'any';
    approximate_age: string | null;
    status_update?: 'change' | 'add'
}
export interface DogChangeItemStruct {
    photos?: string[];
    name?: string;
    //owner?: number;
    id?: number;

    date_birth?: string | null;
    breed_id?: number;
    gender?: 'female' | 'male' | 'any' | null;
    approximate_age?: string | null;
    status_update?: 'change' | 'add' | 'delete'
}