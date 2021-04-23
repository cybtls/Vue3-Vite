import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from '@/router'
import store from '@/store/index'
import http from '@/http/index'
const app = createApp(App)

app.use(ElementPlus)
    .provide('$http', http)
    .use(router)
    .use(store)
    .mount('#app')




//     import { createApp } from 'vue'
// import App from './App.vue'
// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
// import router from '@/router'
// import http from '@/http/index'
// import store from '@/store/index'

// let app = createApp(App)
//     .provide('$http', http)
//     .use(ElementPlus)
//     .use(router)
//     .use(store)

// app.mount('#app')