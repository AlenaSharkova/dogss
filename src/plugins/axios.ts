export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:error', (error) => {
        // сюда попадут ошибки приложения
        console.error('Глобальная ошибка:', error)
    })

    // Можно перехватывать ошибки useFetch/useAsyncData и вызывать error()
})