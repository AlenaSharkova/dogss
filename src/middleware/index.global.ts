import {useAuthStore} from "~/stores/auth.store";
import {useCommonStore} from "~/stores/common.store";

export default defineNuxtRouteMiddleware(async (to, from) => {

    // isAuthenticated() is an example method verifying if a user is authenticated
    const authStore = useAuthStore()
    const commonStore = useCommonStore()
    console.log('defineNuxtRouteMiddleware', to, from)

    if(authStore.statusUser === 'unknown') {
        if (process.client && !authStore.isUseCookie) {
            console.log('client', '!isUseCookie', commonStore.isLoadingPage)
            commonStore.isLoadingPage = true
            console.log('client 2', '!isUseCookie', commonStore.isLoadingPage)

            try {
                await authStore.getUserFullData()
            } catch {
                console.log('err middleware')
            } finally {
                commonStore.isLoadingPage = false;
            }

            //commonStore.isLoadingPage = false
            console.log('client 3', '!isUseCookie', commonStore.isLoadingPage)


        } else if (authStore.isUseCookie) {
            commonStore.isLoadingPage = true

            console.log('authStore.isUseCookie', authStore.isUseCookie)
            try {
                await authStore.getUserFullData()
            } catch {
                console.log('err middleware')
            } finally {
                commonStore.isLoadingPage = false;
            }

        }

    }
    if(to.meta.requirementUser === null) return

    if(authStore.statusUser !== "active"
        && to.meta.requirementUser === 'authorized')
    return navigateTo('/auth/login', { redirectCode: 301 })
    if(authStore.statusUser === "active"
        && to.meta.requirementUser == 'unauthorized')
        return navigateTo('/profile', { redirectCode: 301 })
    //commonStore.isLoadingPage = false

    /*if(process.client && !authStore.isUseCookie) {
        if(authStore.statusUser !== "active"
            && to.meta.requirementUser === 'authorized')
            return navigateTo('/auth/login', { redirectCode: 301 })
        if(authStore.statusUser === "active"
            && to.meta.requirementUser == 'unauthorized')
            return navigateTo('/profile', { redirectCode: 301 })
    } else if(authStore.isUseCookie) {
        if(authStore.statusUser !== "active"
            && to.meta.requirementUser === 'authorized')
            return navigateTo('/auth/login', { redirectCode: 301 })
        if(authStore.statusUser === "active"
            && to.meta.requirementUser == 'unauthorized')
            return navigateTo('/profile', { redirectCode: 301 })
    }

*/


})

