import type {Database} from "db0";
import type {ISelectNumber} from "~/struct/Common/ISelectComponent";

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

export interface AdItemStruct {
    breed: ISelectNumber;
    name: string;
    img: string;
    id: number;
    price: number;
    status: 'active' | 'inactive' | 'archive';
    count_image: number;
    ownerDetails: any;

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
}
export interface AdQueryFilterStruct {
    breeds?: string;
    'max-price'?: string;
    'min-price'?: string;
    regions?: string;
    type?: string;
    gender?: string;
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

