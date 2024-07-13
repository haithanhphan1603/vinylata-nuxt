// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-lodash',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxtjs/supabase',
    '@nuxt/fonts',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
  ],
  supabase: {
    redirect: false,
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: './tailwind.config.js',
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
  colorMode: {
    classSuffix: '',
  },
})
