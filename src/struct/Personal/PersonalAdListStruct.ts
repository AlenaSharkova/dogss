import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";


export interface PersonalAdListApiStruct {
    result: PersonalAdListStruct
}
export interface PersonalAdListStruct {
    ad_draft: AdItemStruct[],
    ad_active: AdItemStruct[],
    ad_archive: AdItemStruct[],
}