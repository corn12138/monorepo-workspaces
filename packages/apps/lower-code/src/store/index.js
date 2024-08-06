import { createStore } from 'vuex'
import User from './modules/user.js'

export default createStore({
    modules: {
        User
    }
})