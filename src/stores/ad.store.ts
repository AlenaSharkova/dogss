import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import AdService from '~/service/ad.service';
import type {AdCreateItemStruct, AdItemStruct, AdQueryFilterStruct} from "~/struct/Ad/AdItemStruct";


export const useAdStore = defineStore('adStore', () => {
    const config = useRuntimeConfig();

    const adService = new AdService(config.public.apiBaseUrl);

    const adCatalogList = ref<AdItemStruct[] | null>(null)
    const adCreatedSuccessItem = ref<AdCreateItemStruct | null>(null)

    async function updateAdList(query = null as AdQueryFilterStruct | null) {
        console.log('query', query)
        adService
            .getAdList(query)
            .then((res) => {
                if (res) adCatalogList.value = res.value;

            })
            .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
    }

    async function createAd(body: AdCreateItemStruct) {
        adService
            .postAdItem(body)
            .then((res) => {
                //TO DO: мб не нужен вывод adCreatedSuccessItem, успех и сессию запрашиваем
                if (res) adCreatedSuccessItem.value = res.value;
                console.log('adCreatedSuccessItem in store', adCreatedSuccessItem.value)
            })
            .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
    }
    return {
        adCatalogList,
        updateAdList,
        createAd,
        adCreatedSuccessItem,
    }
})

