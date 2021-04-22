// 非对称加密
import env from '@/config/env.js'
// const { JSEncrypt } = require('encryptlong')
// // 加密
// export const encryption = (data) => {
//     let decrypt = new JSEncrypt()
//     decrypt.setPublicKey(env.serverRsaPublicKey)
//     return decrypt.encryptLong(encodeURI(data))
// }
// // 解密
// export const decrypt = (data) => {
//     let decrypt = new JSEncrypt()
//     decrypt.setPrivateKey(env.clientRsaPrivateKey)
//     return decodeURIComponent(decrypt.decryptLong(data))
// }

// 对称加密
import CryptoJS from 'crypto-js'//引用AES源码js
const key = CryptoJS.enc.Utf8.parse("0102030405060708")  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('0102030405060708')  //十六位十六进制数作为密钥偏移量
// 加密
export const encryption = (data) => {
    let srcs = CryptoJS.enc.Utf8.parse(encodeURI(data))
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    return encrypted.ciphertext.toString().toUpperCase()
}
// 解密
export const decrypt = (data) => {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(data)
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decodeURIComponent(decryptedStr.toString())
}
