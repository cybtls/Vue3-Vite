import axios from 'axios'
import env from '../config/config'
import { ElMessage } from 'element-plus'
// 引入加解密
import { encryption, decrypt } from '@/util/secretKey'

const context = import.meta.globEager('./**/*.api.js')
// const context = require.context('../modules', true, /\.api.js$/)
let apiList = []
Object.keys(context).forEach(key => {
    apiList = apiList.concat(context[key].default)
})

class HttpInstance {
    _apiList = []

    constructor(apiList = []) {
        this._instance = axios.create({
            baseURL: env.baseUrl,
            withCredentials: true
        })
        // 请求拦截
        this._instance.interceptors.request.use(this._requestIntercept.bind(this), this._errorIntercept)
        // 响应拦截
        this._instance.interceptors.response.use(this._responseIntercept.bind(this), this._errorIntercept)

        // 一个个创建对应请求方法
        apiList.forEach(item => {
            let apiName = this._getApiName(item)
            this[apiName] = function (value = {}, options = {}) {
                return this._getApiFunction(value, options, item)
            }
        })
    }

    // 请求拦截封装
    _requestIntercept (config) {
        let needEncryption = false
        this._apiList.some(item => {
            if (config.url.indexOf(item.url) !== -1) {
                needEncryption = item.needEncryption
                return true
            }
        })
        // 需要加密
        if (needEncryption) {
            config.headers['Content-Type'] = 'application/json'
            config.data = encryption(JSON.stringify(config.data))
        }
        return config
    }

    // 响应拦截封装
    _responseIntercept (response) {
        let needDecrypt = false,
            responseUrl = response.config.url.split(env.baseUrl)[1]
        this._apiList.some(item => {
            if (item.url === responseUrl) {
                needDecrypt = item.needDecrypt
                return true
            }
        })
        // 需要解密
        if (needDecrypt) {
            response.data = JSON.parse(decrypt(response.data))
        }
        if (response.data.code === 200) {
            return response
        } else {
            ElMessage('服务异常')
            return Promise.reject(response)
        }
    }

    // 错误拦截封装
    _errorIntercept (err) {
        return Promise.reject(err)
    }

    // 获取名称
    _getApiName (item) {
        let apiName = '',
            arr = item.url.split('/')
        if (item.url) {
            apiName = item.apiName ? item.apiName : arr[arr.length - 1]
        } else {
            throw new Error('api对象必须要有url', item)
        }
        return apiName
    }

    // 获取配置
    _getConfig (value, options, item) {
        let config = {
            url: item.url,
            method: item.method ? item.method : 'post',
        }
        if (config.method === 'post') {
            config.data = value
        } else {
            config.params = value
        }
        Object.keys(options).forEach(key => {
            config[key] = options[key]
        })
        return config
    }

    // 发送请求
    _getApiFunction (value = {}, options = {}, item = {}) {
        let config = this._getConfig(value, options, item)
        return this._instance(config).then(res => {
            return res
        }).catch((err) => {
            // ElMessage({
            //     type: 'error',
            //     message: '异常'
            // })
            return Promise.reject(err)
        })
    }
}
export default new HttpInstance(apiList)