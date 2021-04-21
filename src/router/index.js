import { createRouter, createWebHashHistory } from 'vue-router'

const routes = []
const context = import.meta.globEager('./**/*.router.js')
Object.keys(context).forEach(key => {
    let _arr = context[key].default || []
    routes.push(..._arr)
})

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router