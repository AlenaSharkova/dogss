import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import AdService from '~/service/ad.service';
import type {
    AdCreateItemStruct, AdFullFilterStruct,
    AdItemStruct,
    AdListApiDetails,
    AdListApiQuery,
    AdQueryFilterStruct
} from "~/struct/Ad/AdItemStruct";
import {q} from "~~/.output/server/chunks/runtime.mjs";
import {useCommonStore} from "~/stores/common.store";


export const useAdStore = defineStore('adStore', () => {
    const config = useRuntimeConfig();

    const adService = new AdService(config.public.apiBaseUrl);
    const commonStore = useCommonStore()
    const personalStore = usePersonalStore()

    const adCatalogList = ref<AdItemStruct[] | null>(null)
    const adCatalogListDetails = ref<AdListApiDetails | null>(null)
    const adCatalogFilter = ref<AdFullFilterStruct>({})
    const adCreatedSuccessItem = ref<AdCreateItemStruct | null>(null)
    const filterStore = useFilterStore()

    async function updateAdList(query = null as AdQueryFilterStruct | null) {
        console.log('query', query)
        if(query) {
            getQueryAd(query)
            query.minAgeMonth = adCatalogFilter.value.ageCategory?.details.minAgeMonth
            query.maxAgeMonth = adCatalogFilter.value.ageCategory?.details.maxAgeMonth
            delete query.ageCategory
        }
        await adService.getAdList(query)
            .then((res) => {
                if (res) {
                    adCatalogList.value = res.result;
                    adCatalogListDetails.value = {
                        limit: res.limit,
                        offset: res.offset,
                        count: res.count,
                    };
                    adCatalogFilter.value.regions = res.queryDetails.regions
                    adCatalogFilter.value.breeds = res.queryDetails.breeds
                    adCatalogFilter.value.maxFullPrice = res.queryDetails.maxFullPrice
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }
    function getQueryAd(query: AdQueryFilterStruct) {
        if(query.type) {
            adCatalogFilter.value.type = filterStore.typeAdList?.find(item => String(item.value) === query.type ) || null
        }
        adCatalogFilter.value['max-price'] = Number(query['max-price'] ) || 0
        adCatalogFilter.value['min-price'] = Number(query['min-price']) || 0
        if(query.gender) {
            adCatalogFilter.value.gender = filterStore.genderList?.find(item => String(item.value) === query.gender ) || null
        }
        if(query.ageCategory) {
            adCatalogFilter.value.ageCategory = filterStore.ageList?.find(item => item.value === query.ageCategory ) || null
        }
    }
    async function createAd(body: AdCreateItemStruct) {
        await adService
            .postAdItem(body)
            .then(async (res) => {
                await personalStore.updatePersonalAdList()
                //TODO: мб не нужен вывод adCreatedSuccessItem, успех и сессию запрашиваем
                //if (res) adCreatedSuccessItem.value = res.value;
                console.log('adCreatedSuccessItem in store', adCreatedSuccessItem.value)
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }
    async function createDraftAd(body: AdCreateItemStruct) {
        await adService
            .postAdItem(body)
            .then((res) => {
                //TODO: мб не нужен вывод adCreatedSuccessItem, успех и сессию запрашиваем
                //if (res) adCreatedSuccessItem.value = res.value;
                console.log('adCreatedSuccessItem in store', adCreatedSuccessItem.value)
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }
    return {
        adCatalogList,
        adCatalogListDetails,
        adCatalogFilter,
        updateAdList,
        createAd,
        adCreatedSuccessItem,
    }
})

