import type {ISelectComponent, ISelectComponentWithChildren, ISelectNumber} from "~/struct/Common/ISelectComponent";
import type {IStatusAd} from "~/struct/Common/IValueType";
import type {UserItemPublicPreviewStruct} from "~/struct/User/UserItemStruct";


export interface AdListApiDetails {
    limit: number;
    offset: number;
    count: number;
}
export interface AdListApiQuery {
    breeds?: ISelectNumber[] | null;
    regions?: ISelectNumber[] | null;
    maxFullPrice: number;
}
export interface AdListApi {
    limit: number;
    offset: number;
    count: number;
    queryDetails: AdListApiQuery;
    result: AdItemStruct[]
}
export interface AdItemStruct {
    breed: ISelectNumber;
    name: string;
    photos: string[];
    id: number;
    price: number | null;
    status: IStatusAd;
    count_image: number;
    ownerDetails: UserItemPublicPreviewStruct;
    isFavorite: boolean;

    date_birth: string;
    created_at: string;
    type_ad: 'purchase' | 'good-hands' | 'mating' | 'lost' ;
    description: string;

    exportRegions: {
        isExport: boolean,
        regionsList: ISelectNumber[];
    },
    parents: {
        parents_mum: number | null;
        parents_dad: number | null;
    },
    geo_main: {
        region: ISelectNumber,
        city: ISelectNumber,
    },

    region_main: number
    city_main: number;
    gender: 'female' | 'male' | 'any' | null;
    quantitative: 'one' | 'litter';
    number_male: number | null;
    number_female: number | null;
    approximate_age: string | null;
    is_contractual_price: boolean;
}

export interface AdFullFilterStruct {
    'max-price'?: number;
    'min-price'?: number;
    status?: IStatusAd;
    type?: ISelectComponent | null;
    gender?: ISelectComponent | null;
    breeds?: ISelectNumber[] | null;
    regions?: ISelectComponentWithChildren[] | null;
    maxFullPrice?: number;
    ageCategory?: IFilterAge | null;
}
export interface AdQueryFilterStruct {
    breeds?: string;
    id?: string;
    status?: string;
    'max-price'?: string;
    'min-price'?: string;
    regions?: string;
    type?: string;
    gender?: string;
    ageCategory?: string;
    minAgeMonth?: number;
    maxAgeMonth?: number | 'infinite';
}
export interface AdCreateItemStruct {
    photos: string[];
    name: string;
    owner: number;
    price: number | null;
    count_image: number;

    date_birth: string | null;
    breed_id: number;
    type_ad: 'purchase' | 'good-hands' | 'mating' | 'lost';
    description: string;
    is_export: boolean
    parents_mum?: number | null;
    parents_dad?: number | null;
    region_main: number
    city_main: number;
    gender: 'female' | 'male' | 'any' | null;
    quantitative: 'one' | 'litter';
    number_male: number | null;
    number_female: number | null;
    approximate_age: string | null;
    is_contractual_price: boolean;
    regionsExport?: number[] | null
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
