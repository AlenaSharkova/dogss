import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import {useCommonStore} from "~/stores/common.store";
import AdCommentService from "~/service/ad-comment.service";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import type {AdCommentSend} from "~/struct/Ad/AdCommentStruct";

export const useAdCommentStore = defineStore('adCommentStore', () => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore()
    const commonStore = useCommonStore()

    authStore.getSessionToken()
    const token = computed(() => String(authStore.sessionToken))
    console.log('tokenff 000' , token.value)

    const adCommentService = new AdCommentService(config.public.apiBaseUrl, token.value);

    const idAdOfferLeaveComment = ref<number | null>(null)
    const adForComment = ref<AdItemStruct | null>(null)
    const hashLink = ref<string | null>(null)

    const showOfferLeaveComment = (idAd: number) => {
        idAdOfferLeaveComment.value = idAd
    }
    const closeOfferLeaveComment = () => {
        idAdOfferLeaveComment.value = null
        hashLink.value = null
    }

    async function getHashLinkComment(id: number) {
        await nextTick()
        await adCommentService.getCommentHashLink(id)
            .then((res) => {
                if (res?.hash) {
                    hashLink.value = res.hash
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
            });
    }

    async function getAdForComment(hash: string) {
        await nextTick()
        await adCommentService.getAccessComment(hash)
            .then((res) => {
                if (res) {
                    adForComment.value = res
                }
            })
            .catch(err => {
                //commonStore.addUserErrorAlert(err.data?.statusMessage)
                //commonStore.addUserErrorAlert(err.data?.message, true)
                showError({statusCode: err.data?.statusCode, statusMessage: err.data?.statusMessage})
            });
    }
    async function sendComment(info: AdCommentSend) {
        await nextTick()
        await adCommentService.addCommentToAd(info)
            .then((res) => {
                if (res?.success) {
                    commonStore.showResultModal({
                        title: res.message,
                        status: "success",
                    })
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
            });
    }


    return {
        getHashLinkComment,
        showOfferLeaveComment,
        getAdForComment,
        sendComment,
        closeOfferLeaveComment,
        idAdOfferLeaveComment,
        adForComment,
        hashLink
    }
})

