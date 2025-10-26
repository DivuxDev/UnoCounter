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
import '@/styles/buttons.scss'

import 'vuetify/styles'

import App from './App.vue'
import router from './router'

import VuetifyNotifier from "vuetify-notifier";

const app = createApp(App)

app.use(vuetify)
app.use(VuetifyNotifier
)
app.use(createPinia())
app.use(router)

app.mount('#app')
