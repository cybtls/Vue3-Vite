import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        // 代理，最重要，其他的都可以有默认配置
        proxy: {
            '/api': {
                target: 'http://192.168.1.235:8888/',
                changeOrigin: true,
            }
        },
        // 端口
        port: 8888,
        // 是否自动开启浏览器
        open: false
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    plugins: [vue()]
})
