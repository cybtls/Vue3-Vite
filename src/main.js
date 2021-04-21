import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from '@/router'
import http from '@/http/index'
import store from '@/store/index'

let app = createApp(App)
    .provide('$http', http)
    .use(ElementPlus)
    .use(router)
    .use(store)

app.mount('#app')