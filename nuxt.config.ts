// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css","~/assets/css/fonts.css"],
  nitro: {
    preset:"cloudflare-pages",
    experimental:{
      database:true
    },
    database:{
      golbargDB:{
        connector:"cloudflare-d1",
        options:{
          bindingName:"golbargai-db-link"
        }
      }
    },
    storage: {
      'uploads': {
        driver: 'fs',
        base: './public/uploads'
      }
    },
    publicAssets: [
      {
        baseURL: '/uploads',
        dir: './public/uploads'
      }
    ]
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['shadcn-nuxt'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
})