import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ApiPlugin from './plugins/api'
import LoadPlugin from './plugins/load'


createApp(App)
    .use(store)
    .use(router)
    .use(ApiPlugin)
    .use(LoadPlugin)
    .mount('#app')

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
