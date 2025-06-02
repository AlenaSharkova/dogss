import type {Database} from "db0";
import type {ISelectComponent, ISelectComponentWithChildren, ISelectNumber} from "~/struct/Common/ISelectComponent";


export interface UserItemFullStruct {
    id: number;
    status: 'active' | 'unconfirmed' | 'archive';
    created_at: string;
    personal_data: {
        photo: string;
        email: string;
        first_name: string;
        last_name: string;
        phone: string;
        //TODO:created_at
        geo_main: {
            region: ISelectNumber,
            city: ISelectNumber,
        },
    }
}

export interface UserCreateItemStruct {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    region: number,
    city: number,
}

/*
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
    result: UserItemStruct[]
}*/
/*
export interface AdFullFilterStruct {
    'max-price'?: number;
    'min-price'?: number;
    type?: ISelectComponent | null;
    gender?: ISelectComponent | null;
    breeds?: ISelectNumber[] | null;
    regions?: ISelectComponentWithChildren[] | null;
    maxFullPrice?: number;
    ageCategory?: IFilterAge | null;
}
export interface AdQueryFilterStruct {
    breeds?: string;
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
    img: string;
    name: string;
    owner: number;
    price: number | null;
    count_image: number;

    date_birth: string;
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
    regionsExport?: number[] | null
}

export interface ISelectTypeAd {
    text?: string,
    value?: 'purchase' | 'good-hands' | 'mating' | 'lost' | '';
}
export interface ISelectGender {
    text?: string,
    value?: 'female' | 'male' | 'any' | '';
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
*/