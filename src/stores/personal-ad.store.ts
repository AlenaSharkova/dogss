import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import PersonalAdService from '~/service/personal-ad.service';
import type {
    AdChangeItemStruct,
    AdCreateItemStruct,
    AdItemStruct,
} from "~/struct/Ad/AdItemStruct";
import {useCommonStore} from "~/stores/common.store";
import type {PersonalAdListStruct} from "~/struct/Personal/PersonalAdListStruct";
import type {UserChangeItemStruct} from "~/struct/User/UserItemStruct";
import type {IStatusAd} from "~/struct/Common/IValueType";
import type {ICommonZoomPhotosGallery} from "~/struct/Common/ICommonComponents";


export const usePersonalAdStore = defineStore('personalAdStore', () => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore()
    authStore.getSessionToken()
    const token = computed(() => String(authStore.sessionToken))
    console.log('tokenff 000' , token.value)

    const personalAdService = new PersonalAdService(config.public.apiBaseUrl, token.value);
    //console.log('token pers', token)
    const commonStore = useCommonStore()


    const AdPersonalList = ref<PersonalAdListStruct | null>(null)
    const AdPersonalCurrentItemActive = ref<AdItemStruct | null>(null)
    const AdPersonalCurrentItemDraft = ref<AdItemStruct | null>(null)
    const isLoadingPersonalAdList = ref(false)

    async function updatePersonalAdList() {
        isLoadingPersonalAdList.value = true
        await personalAdService.getPersonalAdList()
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
            })
            .finally(() => {
                isLoadingPersonalAdList.value = false
            })
    }
    async function getPersonalAdCurrentDraft(id: number | string) {
        await personalAdService.getPersonalAdItem(id, 'draft')
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

    async function getPersonalAdCurrentActive(id: number | string) {
        await personalAdService.getPersonalAdItem(id, 'active')
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
    async function deletePersonalAd(statusAd: IStatusAd, adId = null as number | string | null) {
        await personalAdService.deletePersonalAd(statusAd, adId)
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
    async function createAd(body: AdCreateItemStruct) {
        await personalAdService
            .postAdItem(body)
            .then( (res) => {
                 updatePersonalAdList()
                //TODO: мб не нужен вывод adCreatedSuccessItem, успех и сессию запрашиваем
                //if (res) adCreatedSuccessItem.value = res.value;
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }
    async function changeAd(body: AdChangeItemStruct, id: number | string, newStatus = null as null | IStatusAd) {
        await personalAdService
            .patchAdItem(body, id, newStatus)
            .then(res => {

                updatePersonalAdList()
                //TODO: мб не нужен вывод adCreatedSuccessItem, успех и сессию запрашиваем
                //if (res) adCreatedSuccessItem.value = res.value;
                console.log('adCreatedSuccessItem in store', res)

            })
            .catch(e => {
                console.log('eerrr in store ' , e)
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }
    async function changeAdAdmin(body: AdChangeItemStruct, id: number | string, newStatus = null as null | IStatusAd) {
        await personalAdService
            .patchAdItem(body, id, newStatus)
            .then(res => {
                //if (res) adCreatedSuccessItem.value = res.value;
                console.log('adCreatedSuccessItem in store', res)

            })
            .catch(e => {
                console.log('eerrr in store ' , e)
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }


    onMounted(() => {
        if(authStore.statusUser === 'active') {
            updatePersonalAdList()
        }
    })
    watch(() => authStore.statusUser,
        async (newStatus) => {
            personalAdService.setAuthToken(authStore.sessionToken)
            if(newStatus === 'active') {
                updatePersonalAdList()
            } else {
                AdPersonalList.value = null
                AdPersonalCurrentItemActive.value = null
                AdPersonalCurrentItemDraft.value = null
            }
        })

    return {
        AdPersonalList,
        updatePersonalAdList,
        getPersonalAdCurrentDraft,
        getPersonalAdCurrentActive,
        AdPersonalCurrentItemDraft,
        AdPersonalCurrentItemActive,
        changeAdAdmin,
        deletePersonalAd,
        createAd,
        changeAd,
        isLoadingPersonalAdList
    }
})

