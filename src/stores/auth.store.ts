import { defineStore } from 'pinia';import AuthService from "~/service/auth.service";


export const useAuthStore = defineStore('adStore', () => {
    const config = useRuntimeConfig();

    const authService = new AuthService(config.public.apiBaseUrl);


    async function SendEmail() {
        authService.sendEmail()
            .then((res) => {
                if (res) {
                    console.log(res)   }
            })
            .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
    }

    return {
        SendEmail
    }
})

