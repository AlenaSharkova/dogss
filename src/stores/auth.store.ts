import {defineStore, skipHydrate} from 'pinia';
import AuthService from "~/service/auth.service";
import {useCommonStore} from "~/stores/common.store";
import { useLocalStorage } from '@vueuse/core'
import type {
    UserCreateItemStruct,
    UserItemFullStruct,
} from "~/struct/User/UserItemStruct";
import init from "@parcel/watcher-wasm";
import type {IStatusAd, IStatusUser} from "~/struct/Common/IValueType";


export const useAuthStore = defineStore('authStore', () => {
    const config = useRuntimeConfig();
    const commonStore = useCommonStore()

    const authService = new AuthService(config.public.apiBaseUrl);
    //const breederStore = useBreederStore()


    const sessionToken = ref('');
    const sessionTokenCookie = ref(
        useCookie('sessionToken', {
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax',
            secure: true,
            //secure: process.env.NODE_ENV === 'production',
    }));
    const isUseCookie = ref(false);
    const lastPageRedirect = ref('');
    const userFullData = ref<UserItemFullStruct | null>(null);
    const statusUser = ref<IStatusUser>('unknown')
    const tokenLocalStore = skipHydrate(useLocalStorage<string>('sessionToken', ''))


    const updateSessionToken = async (token: string) => {
        //localStorage.setItem("sessionToken", token)
        console.log('updateSessionToken')

        tokenLocalStore.value = token
        console.log('updateSessionToken', tokenLocalStore)

        if(isUseCookie.value) {
            sessionTokenCookie.value = token
        }

        console.log('sessionTokenCookie', useCookie('sessionToken'), sessionTokenCookie.value)
        getSessionToken()
        console.log('sessionToken', sessionToken.value)
        await getUserFullData()
    }
    const logout = async () => {
        await updateSessionToken('')
    }
    const getSessionToken = () => {
        const token = sessionTokenCookie.value

        sessionToken.value = (isUseCookie.value? token: tokenLocalStore.value) || ''
    }

    async function sendEmailForLogin(email: string) {
        return await authService.loginEmail(email)
            .then((res) => {
                if (res) return res
            })
            .catch(e => {
                if(e.data?.statusCode !== 401) {
                    commonStore.addUserErrorAlert(e.data?.statusMessage)
                    commonStore.addUserErrorAlert(e.data?.message, true)
                }
                throw e.data
            });
        /*.finally(() => (isLoading.value = false));*/
    }
    async function sendEmailForConfirm(email: string) {
        return await authService.loginEmail(email, true)
            .then((res) => {
                if (res) return res
            })
            .catch(e => {
                if(e.data?.statusCode !== 401) {
                    commonStore.addUserErrorAlert(e.data?.statusMessage)
                    commonStore.addUserErrorAlert(e.data?.message, true)
                }
                throw e.data
            });
        /*.finally(() => (isLoading.value = false));*/
    }

    async function sendEmailForRegistration(body: UserCreateItemStruct) {
        return await authService.registrationEmail(body)
            .then((res) => {
                if (res) return res
            })
            .catch(e => {
                console.log('eeee', e)
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
        /*.finally(() => (isLoading.value = false));*/
    }

    async function getSessionTokenWitchOtp(email: string, otp: string) {
        console.log('getSessionTokenWitchOtp store')
        return await authService.verifyOtp(email, otp)
            .then(async (res) => {
                if (res) {
                    console.log('getSessionTokenWitchOtp 0', res)

                    await updateSessionToken(res.token)
                    console.log('getSessionTokenWitchOtp', res)

                    return res
                }
            })
            .catch(e => {
                if(!(e.data?.statusCode == 401 || e.data?.statusCode == 400)) {
                    commonStore.addUserErrorAlert(e.data?.statusMessage)
                    commonStore.addUserErrorAlert(e.data?.message, true)
                }
                throw e.data
            });
        /*.finally(() => (isLoading.value = false));*/
    }
    async function getSessionTokenWitchLink(tokenLink: string) {
        console.log('getSessionTokenWitchLink 123')
        await authService.verifyCodeLink(tokenLink)
            .then(async (res) => {
                console.log('getSessionTokenWitchLink 1234', res)
                if (res) {
                    await updateSessionToken(res.token)
                    console.log('getSessionTokenWitchLink 123456', res)
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                throw e.data
            });
        /*.finally(() => (isLoading.value = false));*/
    }
    async function checkEmailAvailability(email: string) {
        return await authService.checkEmailAvailability(email)
            .then((res) => {
                return res
            })
            .catch(e => {
                throw e.data
            });
    }
    async function getUserFullData() {
        console.log('getUserFullData', sessionToken.value)
        getSessionToken()
        if(!sessionToken.value) {
            userFullData.value = null
            statusUser.value = 'unauthorized'
            console.log('обновили пользователя', null)
            return null
        }
        await authService.getSession(sessionToken.value)
            .then((res) => {
                console.log('getSession in getUserFullData', res)
                if (res) {
                    userFullData.value = res
                    statusUser.value = res.status
                   // breederStore.idMyBreeder = res.id_breeder
                    console.log('обновили пользователя')
                }
            })
            .catch(e => {
                commonStore.addUserErrorAlert(e.data?.statusMessage)
                commonStore.addUserErrorAlert(e.data?.message, true)
                statusUser.value = 'unauthorized'
                throw e.data
            })
    }

    return {
        sendEmailForLogin,
        sendEmailForRegistration,
        sendEmailForConfirm,
        getSessionTokenWitchOtp,
        getSessionTokenWitchLink,
        getSessionToken,
        getUserFullData,
        updateSessionToken,
        checkEmailAvailability,
        logout,
        sessionToken,
        userFullData,
        statusUser,
        isUseCookie,
        lastPageRedirect
    }
})

