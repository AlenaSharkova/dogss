import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import PersonalService from '~/service/personal.service';
import type {
    AdItemStruct,
} from "~/struct/Ad/AdItemStruct";
import {useCommonStore} from "~/stores/common.store";
import type {PersonalAdListStruct} from "~/struct/Personal/PersonalAdListStruct";


export const usePersonalStore = defineStore('personalStore', () => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore()
    authStore.getSessionToken()
    const token = computed(() => String(authStore.sessionToken))
    console.log('tokenff 000' , token.value)

    const personalService = new PersonalService(config.public.apiBaseUrl, token.value);
    //console.log('token pers', token)
    const commonStore = useCommonStore()


    const AdPersonalList = ref<PersonalAdListStruct | null>(null)
    const AdPersonalCurrentItemActive = ref<AdItemStruct | null>(null)
    const AdPersonalCurrentItemDraft = ref<AdItemStruct | null>(null)
    const FavoritesList = ref<AdItemStruct[] | null>(null)

    async function updatePersonalAdList() {
        await personalService.getPersonalAdList()
            .then((res) => {
                console.log('ressss', res)
                if (res) {
                    AdPersonalList.value = res.result;
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }
    async function getPersonalAdCurrentDraft(id: number | string) {
        await personalService.getPersonalAdItem(id, 'draft')
            .then((res) => {
                console.log('ressss', res)
                if (res) {
                    AdPersonalCurrentItemDraft.value = res;
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }

    async function getPersonalAdCurrentActive(id: number) {
        await personalService.getPersonalAdItem(id, 'active')
            .then((res) => {
                console.log('ressss', res)
                if (res) {
                    AdPersonalCurrentItemActive.value = res;
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }
    async function deletePersonalAd(adId: number) {
        await personalService.deletePersonalAd(adId)
            .then((res) => {
                console.log('ressss ad delete', res)
                if (res?.success) {
                    updatePersonalAdList()
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }
    async function addPersonalFavorite(adId: number) {
        await personalService.postPersonalFavorite(adId)
            .then((res) => {
                console.log('ressss favorites', res)
                if (res?.success) {
                    updateFavorites()
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }
    async function deletePersonalFavorite(adId: number) {
        await personalService.deletePersonalFavorite(adId)
            .then((res) => {
                console.log('ressss favorites delete', res)
                if (res?.success) {
                    updateFavorites()
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }
    async function updateFavorites() {
        await personalService.getPersonalFavorite()
            .then((res) => {
                console.log('ressss favorites', res)
                if (res) {
                    FavoritesList.value = res.result;
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }

    onMounted(() => {
        if(authStore.statusUser === 'active') {
            updatePersonalAdList()
            updateFavorites()
        }
    })
    /*watch(() => authStore.statusUser,
        async (newValue) => {
            if(newValue == 'active') {
                await updatePersonalAdList()
            }
        })*/

    return {
        AdPersonalList,
        updatePersonalAdList,
        getPersonalAdCurrentDraft,
        getPersonalAdCurrentActive,
        AdPersonalCurrentItemDraft,
        AdPersonalCurrentItemActive,
        addPersonalFavorite,
        updateFavorites,
        FavoritesList,
        deletePersonalAd,
        deletePersonalFavorite
    }
})

