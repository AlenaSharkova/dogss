import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import PersonalService from '~/service/personal.service';
import type {
    AdItemStruct,
} from "~/struct/Ad/AdItemStruct";
import {useCommonStore} from "~/stores/common.store";
import type {PersonalAdListStruct} from "~/struct/Personal/PersonalAdListStruct";
import type {UserChangeItemStruct} from "~/struct/User/UserItemStruct";
import type {IStatusAd} from "~/struct/Common/IValueType";


export const usePersonalStore = defineStore('personalStore', () => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore()
    authStore.getSessionToken()
    const token = computed(() => String(authStore.sessionToken))
    console.log('tokenff 000' , token.value)

    const personalService = new PersonalService(config.public.apiBaseUrl, token.value);
    //console.log('token pers', token)
    const commonStore = useCommonStore()
    const FavoritesList = ref<AdItemStruct[] | null>(null)

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

    async function changeUserData(data: UserChangeItemStruct) {
        await personalService.patchUser(data)
            .then((res) => {
                console.log('ressss update user', res)
                if (res) {
                    authStore.getUserFullData()
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
            updateFavorites()
        }
    })
    watch(() => authStore.statusUser,
        async (newStatus) => {
            personalService.setAuthToken(authStore.sessionToken)
            if(newStatus === 'active') {
                updateFavorites()
            } else {
                FavoritesList.value = null
            }
        })

    return {
        addPersonalFavorite,
        updateFavorites,
        FavoritesList,
        deletePersonalFavorite,
        changeUserData
    }
})

