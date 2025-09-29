import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import PersonalAdService from '~/service/personal-ad.service';
import type {
    AdAdminItemStruct,
    AdChangeItemStruct,
    AdCreateItemStruct,
    AdItemStruct,
} from "~/struct/Ad/AdItemStruct";
import {useCommonStore} from "~/stores/common.store";
import type {PersonalAdListStruct} from "~/struct/Personal/PersonalAdListStruct";
import type {UserChangeItemStruct} from "~/struct/User/UserItemStruct";
import type {IStatusAd} from "~/struct/Common/IValueType";
import AdminService from "~/service/admin.service";


export const useAdminStore = defineStore('adminStore', () => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore()
    authStore.getSessionToken()
    const token = computed(() => String(authStore.sessionToken))
    console.log('tokenff 000' , token.value)

    const adminService = new AdminService(config.public.apiBaseUrl, token.value);
    //console.log('token pers', token)
    const commonStore = useCommonStore()

    const adListAdmin = ref<AdAdminItemStruct<AdItemStruct[]> | null>(null)

    const AdPersonalList = ref<PersonalAdListStruct | null>(null)
    const AdPersonalCurrentItemActive = ref<AdItemStruct | null>(null)
    const AdPersonalCurrentItemDraft = ref<AdItemStruct | null>(null)


    async function updateAdList() {
        await nextTick()
        await adminService.getAdList({status: 'moderation,draft' })
            .then((res) => {
                adListAdmin.value = res as AdAdminItemStruct<AdItemStruct[]>
            })
            .catch(err => {
                commonStore.addUserErrorAlert(err.data?.statusMessage)
                commonStore.addUserErrorAlert(err.data?.message, true)
                showError({statusCode: err.data?.statusCode, statusMessage: err.data?.statusMessage})
            });
    }

    async function changeAd(body: AdChangeItemStruct, id: number | string, newStatus = null as null | IStatusAd) {
        await adminService
            .patchAdItem(body, id, newStatus)
            .then(res => {
                //if (res) adCreatedSuccessItem.value = res.value;
                console.log('adCreatedSuccessItem in store', res)
                commonStore.addUserSuccessAlert( `Объявление обновлено ${id}`)
                updateAdList()
            })
            .catch(e => {
                console.log('eerrr in store ' , e)
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw createError({
                    statusCode: 500,
                    message: `Пользователь с ID  не найден!`,
                });
            });
    }

    return {
        AdPersonalList,
        updateAdList,
        AdPersonalCurrentItemDraft,
        AdPersonalCurrentItemActive,
        changeAd,
        adListAdmin
    }
})

