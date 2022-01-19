require('dotenv').config()

export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/service-interceptor.js',
    '~/plugins/axios-intercaptor.js',
    { src: '~/plugins/notyf', ssr: false }
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome'
  ],

  fontawesome: {
    icons: {
      solid: true,
      brand: true
    }
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxt/http',
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['cookie-universal-nuxt', { alias: 'cookiz' }]
  ],
  axios: {
    // baseURL: 'http://localhost:' + process.env.PORT // Used as fallback if no runtime config is provided
    baseURL: 'http://localhost:' + process.env.PORT
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/user/login', method: 'post', propertyName: 'token' },
          user: { url: '/api/user/me', method: 'get', propertyName: 'data' },
          logout: false
        },
        redirect: {
          login: '/',
          logout: '/login'
        }
      }
    }
  },

  /*
  ** Server Middleware
  */
  // serverMiddleware: {
  //   '/api': '~/api'
  // },

  /*
  ** For deployment you might want to edit host and port
  */
  server: {
    port: process.env.PORT, // default: 3000
    host: 'localhost' // default: localhost
  },
  serverMiddleware: [
    {
      path: '/api', handler: '@/api'
    }
  ],
  router: {
    extendRoutes (router, resolve) {
      router.push({ path: '/', component: resolve(__dirname, '@/pages/index.vue') })
      router.push({ path: '/login', component: resolve(__dirname, '@/pages/auth/login.vue') })
      router.push({ path: '/add-product', component: resolve(__dirname, '@/pages/addProduct.vue') })
      router.push({ path: '/checkout/:id', component: resolve(__dirname, '@/pages/checkout.vue') })
      router.push({ path: '/cart', component: resolve(__dirname, '@/pages/cart.vue') })
      router.push({ path: '/allOrders', component: resolve(__dirname, '@/components/AllOrderList.vue') })
      router.push({ path: '/myorders', component: resolve(__dirname, '@/components/MyOrders.vue') })
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
