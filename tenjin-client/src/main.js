import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from "vue-i18n"
import { useStore } from '@/stores/store'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import TableLite from "vue3-table-lite"

import en from "./locales/en.json"
import gr from "./locales/gr.json"

axios.defaults.baseURL = 'http://localhost:3030/api/'

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: { en, gr },
})

const app = createApp(App)

app.component(TableLite)
app.use(createPinia())
app.use(router)
app.use(Toast)
app.use(i18n)

app.mount('#app')
