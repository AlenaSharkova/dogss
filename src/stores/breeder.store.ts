import {defineStore} from "pinia";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import AdCommentService from "~/service/ad-comment.service";
import {computed, ref} from "vue";
import BreederService from "~/service/breeder.service";
import {useCommonStore} from "~/stores/common.store";
import type {BreederSiteItemStruct} from "~/struct/Breeder/BreederSiteStruct";

export const useBreederStore = defineStore('breederStore', () => {
    const config = useRuntimeConfig();
    const token = computed(() => String(authStore.sessionToken))

    const authStore = useAuthStore()
    const commonStore = useCommonStore()

    const breederService = new BreederService(config.public.apiBaseUrl, token.value);

    const breederView = ref<BreederSiteItemStruct | null>(null)
    const breederSetting = ref<BreederSiteItemStruct | null>(null)
    const breederChange = ref<BreederSiteItemStruct | null>(null)

    const idRequestBreederView = ref<string | number | null>(null)

    async function getViewBreeder(type: 'setting' | 'view') {
        if(!idRequestBreederView.value) return
        await breederService.getBreederById(idRequestBreederView.value)
            .then((res) => {
                if (res) {
                    if(type === 'setting') breederSetting.value = res;
                    if(type === 'view') breederView.value = res;
                } else {
                    commonStore.addUserErrorAlert('Ошибка загрузки данных питомника')
                    commonStore.addUserErrorAlert('Ошибка загрузки данных питомника  res == false', true)
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }

    async function createBreeder(body: BreederSiteItemStruct){
        breederService.postBreeder(body).then((res) => {
            console.log('res cerate', body)
        })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
    }

    return {
        idRequestBreederView,
        getViewBreeder,
        breederView,
        createBreeder
    }
})