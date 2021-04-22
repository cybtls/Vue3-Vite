import { createStore } from 'vuex'
import getters from './getters'

let modules = {}
const context = import.meta.globEager('./**/*.vuex.js')
// const context = require.context('../modules', true, /\.vuex.js$/)
Object.keys(context).forEach(key => {
    let name = key.match(/.\/(\S*)\/(\S*).vuex.js$/)
    modules[name[2]] = context[key].default
})
export default createStore({
    modules,
    getters
})