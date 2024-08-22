import { createStore } from 'vuex'
import User from './modules/user.js'
import Permission from './modules/permission.js'
// 引入lowerCode模块
import lowerCode from './modules/lowerCode.js'

export default createStore({
    modules: {
        User,
        Permission,
        lowerCode
    }
})