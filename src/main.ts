import { createApp } from 'vue'
import { createPinia } from 'pinia'

import vuetify from './plugins/vuetify'
import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'

import '@/variables.css'

import 'vuetify/styles'

import App from './App.vue'
import router from './router'


const app =createApp(App).use(vuetify)

app.use(createPinia())
app.use(router)

app.mount('#app')
