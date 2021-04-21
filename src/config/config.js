let baseUrl = ''

switch (import.meta.env.VITE_ENVIRONMENT) {
    // 开发环境
    case 'development':
        baseUrl = 'https://www.fastmock.site/mock/e4d5c5b159b6ac1254145b8735b5db49/vite'
        break
    // 生产环境
    case 'production':
        baseUrl = ''
        break
    default:
        break
}

export default {
    baseUrl
}