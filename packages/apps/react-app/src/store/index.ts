//组合 模块
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';//引入redux
import { thunk } from 'redux-thunk'; //引入redux-thunk ---中间件 异步存储
import userReducer from './modules/userReducer'; //引入模块
import productReducer from './modules/productReducer'; //引入模块

const rootReducer = combineReducers({
    //组合模块
    user: userReducer,
    product: productReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk)); //创建store

export default store;