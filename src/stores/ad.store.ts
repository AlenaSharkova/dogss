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


export const useAdStore = defineStore('adStore', () => {
    const config = useRuntimeConfig();

    const adService = new AdService(config.public.apiBaseUrl);

    const adCatalogList = ref<AdItemStruct[] | null>(null)
    const adCatalogListDetails = ref<AdListApiDetails | null>(null)
    const adCatalogFilter = ref<AdFullFilterStruct>({})
    const adCreatedSuccessItem = ref<AdCreateItemStruct | null>(null)
    const filterStore = useFilterStore()

    async function updateAdList(query = null as AdQueryFilterStruct | null) {
        console.log('query', query)
        if(query) getQueryAd(query)
        adService
            .getAdList(query)
            .then((res) => {
                if (res.value) {
                    adCatalogList.value = res.value.result;
                    adCatalogListDetails.value = {
                        limit: res.value.limit,
                        offset: res.value.offset,
                        count: res.value.count,
                    };
                    adCatalogFilter.value.regions = res.value.queryDetails.regions
                    adCatalogFilter.value.breeds = res.value.queryDetails.breeds
                }
            })
            .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
    }
    function getQueryAd(query: AdQueryFilterStruct) {
        if(query.type) {
            adCatalogFilter.value.type = filterStore.typeAdList?.find(item => String(item.value) === query.type ) || null
        }
        adCatalogFilter.value['max-price'] = Number(query['max-price'] ) || 0
        adCatalogFilter.value['min-price'] = Number(query['min-price']) || 0
        if(query.gender) {
            adCatalogFilter.value.gender = filterStore.genderListFull?.find(item => String(item.value) === query.gender ) || null
        }
    }
    async function createAd(body: AdCreateItemStruct) {
        adService
            .postAdItem(body)
            .then((res) => {
                //TO DO: мб не нужен вывод adCreatedSuccessItem, успех и сессию запрашиваем
                //if (res) adCreatedSuccessItem.value = res.value;
                console.log('adCreatedSuccessItem in store', adCreatedSuccessItem.value)
            })
            .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
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

