// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content'],

  routeRules: {
    '/': { prerender: true }
  },

  build: {
    transpile: ['globby'], // Ajoutez 'globby' à la liste des dépendances à transpiler
  },

  compatibilityDate: '2024-08-27'
})