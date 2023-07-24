import './assets/main.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueAxios, axios)
app.use(router)
app.provide('axios', app.config.globalProperties.axios)

app.mount('#app')
