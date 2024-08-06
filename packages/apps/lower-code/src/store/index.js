import { createStore } from 'vuex'
import User from './modules/user.js'
import Permission from './modules/permission.js'

export default createStore({
    modules: {
        User,
        Permission
    }
})