import { defineStore } from 'pinia';import AuthService from "~/service/auth.service";


export const useAuthStore = defineStore('adStore', () => {
    const config = useRuntimeConfig();

    const authService = new AuthService(config.public.apiBaseUrl);

    const sessionToken = ref();

    const updateSessionToken = (token: string) => {
        localStorage.setItem("sessionToken", token)
        getSessionToken()
    }
    const getSessionToken = () => {
        sessionToken.value = localStorage.getItem("sessionToken")
    }
    onMounted(() => {
        getSessionToken()
    })

    async function SendEmail(email: string) {
        authService.sendEmail(email)
            .then((res) => {
                if (res) {
                    console.log(res)   }
            })
            .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
    }
    async function getSessionOtp(email: string, otp: string) {
        console.log('getSessionOtp store')
        authService.sendOtp(email, otp)
            .then((res) => {
                if (res?.value) {
                    updateSessionToken(res.value.token)
                    console.log('getSessionOtp', res)
                }
            })
            .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
    }
    async function getSessionTokenLink(code: string) {
        authService.sendTokenLink(code)
            .then((res) => {
                if (res?.value) {
                    updateSessionToken(res.value.token)
                    console.log('getSessionTokenLink', res)
                }
            })
            .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
    }
    async function updateSession() {
        authService.getSession()
            .then((res) => {
                if (res) {
                    console.log('getSession', res)
                }
            })
            .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
    }

    return {
        SendEmail,
        getSessionOtp,
        getSessionTokenLink,
        updateSession,
        updateSessionToken,
        sessionToken

    }
})

