import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
    server: {
        // 代理，最重要，其他的都可以有默认配置
        proxy: {
            '/api': {
                target: 'http://localhost:8888/',
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
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: (name) => {
                        return `element-plus/lib/theme-chalk/${name}.css`
                    },
                    resolveComponent: (name) => {
                        return `element-plus/lib/${name}`
                    },
                }
            ]
        })
    ]
})
