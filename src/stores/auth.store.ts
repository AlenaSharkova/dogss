import { defineStore } from 'pinia';import AuthService from "~/service/auth.service";
import {useCommonStore} from "~/stores/common.store";


export const useAuthStore = defineStore('authStore', () => {
    const config = useRuntimeConfig();
    const commonStore = useCommonStore()

    const authService = new AuthService(config.public.apiBaseUrl);

    const sessionToken = ref();
    const userData = ref(null);

    const updateSessionToken = (token: string) => {
        localStorage.setItem("sessionToken", token)
        getSessionToken()
    }
    const getSessionToken = () => {
        sessionToken.value = localStorage.getItem("sessionToken")
    }
    onMounted(() => {
        if(!sessionToken.value) getSessionToken()
    })

    async function sendEmailForLogin(email: string) {
        await authService.loginEmail(email)
            .then((res) => {
                if (res) return res
            })
            .catch(e => {
                if(e.data?.statusCode !== 401) {
                    commonStore.addUserErrorAlert(e.data?.statusMessage)
                    commonStore.addUserErrorAlert(e.data?.serviceMessage, true)
                    throw e.data
                }
                throw e.data
            });
        /*.finally(() => (isLoading.value = false));*/
    }
    async function getSessionOtp(email: string, otp: string) {
        console.log('getSessionOtp store')
        await authService.verifyOtp(email, otp)
            .then((res) => {
                if (res) {
                    updateSessionToken(res.token)
                    console.log('getSessionOtp', res)
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.serviceMessage, true)
                throw e.data
            });
        /*.finally(() => (isLoading.value = false));*/
    }
    async function getSessionTokenLink(code: string) {
        await authService.sendTokenLink(code)
            .then((res) => {
                if (res) {
                    updateSessionToken(res.token)
                    console.log('getSessionTokenLink', res)
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.serviceMessage, true)
                throw e.data
            });
        /*.finally(() => (isLoading.value = false));*/
    }
    async function getUserData() {
        console.log('updateSession')
        await authService.getSession()
            .then((res) => {
                console.log('updateSession ss', res)
                if (res) {
                    console.log('getSession', res)
                    userData.value = res
                    return res
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.serviceMessage, true)
                throw e.data
            });
    }

    return {
        sendEmailForLogin,
        getSessionOtp,
        getSessionTokenLink,
        getUserData,
        updateSessionToken,
        sessionToken,
        userData
    }
})

