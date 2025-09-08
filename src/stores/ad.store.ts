import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import AdService from '~/service/ad.service';
import type {
    AdAdminItemStruct,
    AdChangeItemStruct,
    AdCreateItemStruct, AdFullFilterStruct,
    AdItemStruct, AdListApi,
    AdListApiDetails,
    AdListApiQuery,
    AdQueryFilterStruct
} from "~/struct/Ad/AdItemStruct";
import {q} from "~~/.output/server/chunks/runtime.mjs";
import {useCommonStore} from "~/stores/common.store";
import type {IStatusAd} from "~/struct/Common/IValueType";


export const useAdStore = defineStore('adStore', () => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore()
    authStore.getSessionToken()
    const token = computed(() => String(authStore.sessionToken))
    const adService = new AdService(config.public.apiBaseUrl, token.value);
    console.log('adService', {...adService})

    const commonStore = useCommonStore()

    const adCatalogList = ref<AdItemStruct[] | null>(null)
    const adView = ref<AdItemStruct | null>(null)
    const adCatalogListDetails = ref<AdListApiDetails | null>(null)
    const adCatalogFilter = ref<AdFullFilterStruct>({})
    const adCreatedSuccessItem = ref<AdCreateItemStruct | null>(null)
    const filterStore = useFilterStore()
    const queryRequest = ref<AdQueryFilterStruct>({})
    const idRequestAdView = ref<string | null>(null)

    async function requestViewAd(id: string) {
        idRequestAdView.value = id
    }
    async function clearViewAd() {
        idRequestAdView.value = null
    }
    async function getViewAd() {
        await adService.getAdList({id: String(idRequestAdView.value)})
            .then((res) => {
                if (res) adView.value = res as AdItemStruct;
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }

    async function updateAdList() {
        await adService.getAdList(queryRequest.value)
            .then((res) => {
                if (res) setFilterAd(res as AdListApi)
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }
    async function updateAdFilter(query = null as AdQueryFilterStruct | null, hashAuthLocal = false) {
        console.log('updateAdFilter query', query)
        if(query) {
            getQueryAd(query)
            queryRequest.value = setQueryAd(query)
        }
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
        if(query.status === 'moderation') {
            adCatalogFilter.value.status = query.status
        }
    }
    function setQueryAd(query: AdQueryFilterStruct) {
        query.minAgeMonth = adCatalogFilter.value.ageCategory?.details.minAgeMonth
        query.maxAgeMonth = adCatalogFilter.value.ageCategory?.details.maxAgeMonth
        delete query.ageCategory
        return query
    }
    function setFilterAd(res: AdListApi) {
        console.log('res.result ad', res.result)
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

    watch(() => idRequestAdView.value,
        async (newIdRequestAdView) => {
            if(newIdRequestAdView) {
                await getViewAd()
            } else {
                adView.value = null
            }
        })
    watch(() => authStore.statusUser,
        async (newStatus) => {
            console.log('newStatus', newStatus)
            adService.setAuthToken(authStore.sessionToken)
            if(newStatus === 'active' && !authStore.isUseCookie ) {
                await updateAdList()
                if(idRequestAdView.value) {
                    await getViewAd()
                }
            }
        })
    watch(() => queryRequest.value,
        async (newQueryRequest) => {
            console.log('newQueryRequest', newQueryRequest)
            adCatalogList.value = null
            await updateAdList()
        })
    return {
        adCatalogList,
        adCatalogListDetails,
        adCatalogFilter,
        updateAdList,
        adCreatedSuccessItem,
        getViewAd,
        adView,
        updateAdFilter,
        requestViewAd,
        clearViewAd
    }
})

