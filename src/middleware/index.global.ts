import {useAuthStore} from "~/stores/auth.store";
import {useCommonStore} from "~/stores/common.store";

export default defineNuxtRouteMiddleware(async (to, from) => {

    // isAuthenticated() is an example method verifying if a user is authenticated
    const authStore = useAuthStore()
    const commonStore = useCommonStore()
    console.log('defineNuxtRouteMiddleware', to, from)
    if(authStore.statusUser === 'unknown') {
        commonStore.changeIsLoadingPage(true)
        if (process.client && !authStore.isUseCookie) {
            console.log('client', '!isUseCookie', commonStore.isLoadingPage)
            commonStore.isLoadingPage = true
            console.log('client 2', '!isUseCookie', commonStore.isLoadingPage)

            try {
                await authStore.getUserFullData()
            } catch {
                console.log('err middleware')
            } finally {
                console.log('finally 0 middleware', commonStore.isLoadingPage)

                commonStore.changeIsLoadingPage(false)
                console.log('client 3', '!isUseCookie', commonStore.isLoadingPage)
                console.log('finally middleware', commonStore.isLoadingPage)



            }

            //commonStore.isLoadingPage = false


        } else if (authStore.isUseCookie) {
            commonStore.changeIsLoadingPage(true)
            console.log('authStore.isUseCookie', authStore.isUseCookie)
            try {
                await authStore.getUserFullData()
            } catch {
                console.log('err middleware')
            } finally {
                commonStore.changeIsLoadingPage(false)
            }
        }
    }
    if(to.meta.requirementUser === null) return
    if (process.client && !authStore.isUseCookie || authStore.isUseCookie) {
        if (authStore.statusUser !== "active"
            && to.meta.requirementUser === 'authorized')
            return navigateTo('/auth/login', {redirectCode: 301})
        if (authStore.statusUser === "active"
            && to.meta.requirementUser == 'unauthorized')
            return navigateTo('/profile', {redirectCode: 301})
    }

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

