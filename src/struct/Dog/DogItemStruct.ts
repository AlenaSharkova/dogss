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
}
export interface AdChangeItemStruct {
    photos?: string[];
    name?: string;
    owner?: number;
    price?: number | null;
    count_image?: number;

    date_birth?: string | null;
    breed_id?: number;
    type_ad?: 'purchase' | 'good-hands' | 'mating' | 'lost';
    description?: string;
    is_export?: boolean
    parents_mum?: number | null;
    parents_dad?: number | null;
    region_main?: number
    city_main?: number;
    gender?: 'female' | 'male' | 'any' | null;
    quantitative?: 'one' | 'litter';
    number_male?: number | null;
    number_female?: number | null;
    approximate_age?: string | null;
    is_contractual_price?: boolean;
    regionsExport?: number[] | null
}

export interface ISelectTypeAd {
    text?: string,
    value?: 'purchase' | 'good-hands' | 'mating' | 'lost' | '';
}
export interface ISelectGender {
    text?: string,
    value?: 'female' | 'male' | 'any' | 'litter';
}
export interface IFilterTypeAd {
    text: string,
    value?: 'purchase' | 'good-hands' | 'mating' | 'lost' | '';
}
export interface IFilterQuantitative {
    text: string,
    value?:  "one" | "litter" | '';
}

export interface IFilterAge {
    text: string,
    value: 'puppy' | 'young' | 'adult' | 'elderly',
    details: {
        minAgeMonth: number,
        maxAgeMonth: number | 'infinite'
    }
}
export interface AdAdminItemStruct<T> {
    moderation: T,
    draft: T,
    blocked: T
}
