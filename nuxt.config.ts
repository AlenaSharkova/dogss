// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  ssr: true,
  srcDir: 'src/',
  css: [
    '@/assets/style/global/index.scss',
    '@/assets/style/global/map.scss',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      global: true,
    },
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/imports/index.scss" as *;',
          api: 'modern-compiler',
          silenceDeprecations: ["legacy-js-api"],
        }
      },
    },
  },
  vue: {
    compilerOptions: {
      directiveTransforms: {
        motion: () => ({
          props: [],
          needRuntime: true
        })
      }
    }
  },
  modules: ['dayjs-nuxt', '@pinia/nuxt', 'nuxt-swiper'],
  imports: {
    autoImport: true //  Убедитесь, что autoImport включен
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.PROXY,
      websiteUrl: process.env.WEBSITE_URL,
      websiteENV: process.env.WEBSITE_ENV
    },
    postgres: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT, // Порт по умолчанию
    },
  },
  dayjs: {
    plugins: [
      'utc', 'timezone', 'relativeTime',
      'customParseFormat', 'duration'
    ],
    locales: ['ru'],
    defaultLocale: 'ru',
  }
})