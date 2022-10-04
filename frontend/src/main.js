import { createApp } from 'vue'
import App from './App.vue'
import router from '@/js/router'
import store from '@/js/store'
import axios from 'axios'

const app = createApp(App)


app.config.globalProperties.$store = store

app.provide('$store', store)
app.provide('$axios', axios)
app.provide('$hello', 'hello')

app.use(router).use(store).mount('#app')
