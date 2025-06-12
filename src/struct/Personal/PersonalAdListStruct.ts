import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";


export interface PersonalAdListApiStruct {
    result: {
        ad_draft: AdItemStruct[],
        ad_active: AdItemStruct[],
    }
}
export interface PersonalAdListStruct {
    ad_draft: AdItemStruct[],
    ad_active: AdItemStruct[],
}