import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import UploadService from '~/service/upload.service';
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import type {ISelectComponent, ISelectComponentWithChildren} from "~/struct/Common/ISelectComponent";
import {fa} from "cronstrue/dist/i18n/locales/fa";
import {useCommonStore} from "~/stores/common.store";


export const useUploadStore = defineStore('uploadStore', () => {
    const config = useRuntimeConfig();
    const commonStore = useCommonStore()

    const uploadService = new UploadService(config.public.apiBaseUrl);

    let uploadList = ref<ISelectComponent[] | null>(null)

    async function uploadImage(formData: any) {
        return await uploadService
            .uploadObject(formData)
            .then((res) => {
                console.log('uploadListFull in store', formData, res)
                return res
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
        /*.finally(() => (isLoading.value = false));*/
    }
    async function deleteFileStorage(fileUrl: string) {
        return await uploadService
            .deleteObjectStorage(fileUrl)
            .then((res) => {
                console.log('uploadListFull in store',  res)
                if (res) return res
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
        /*.finally(() => (isLoading.value = false));*/
    }
    return {
        uploadImage,
        deleteFileStorage
    }
})
