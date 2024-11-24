export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@nuxtjs/eslint-module'],
  eslint: {
    extensions: ['.js', '.vue'],
    lintOnStart: true,
    fix: true,
  },
  vuetify: {
    vuetifyOptions: {
      defaults: {
        global: {
          color: 'primary',
        },
      },
      theme: {
        defaultTheme: 'blueTheme',
        themes: {
          blueTheme: {
            dark: false,
            colors: {
              primary: '#2196F3',
              secondary: '#03A9F4',
            },
          },
        },
      },
    },
  },
});
