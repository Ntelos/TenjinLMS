import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import TableLite from "vue3-table-lite"

axios.defaults.baseURL = 'http://localhost:3030/api/'

const app = createApp(App)

app.component(TableLite)
app.use(createPinia())
app.use(router)
app.use(Toast)

app.mount('#app')
