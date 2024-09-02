import axios from 'axios';

// 创建 axios 实例
let instance = axios.create({
    baseURL: 'http://localhost:3000/api', // 配置基础URL，所有请求都会以此为前缀
    timeout: 1000, // 设置请求超时时间为1000毫秒
    withCredentials: false, // 是否在跨域请求时发送cookie，默认为false
});

let token = localStorage.getItem('token'); // 从本地存储获取用户 token
let xsrfToken = localStorage.getItem('xsrfToken'); // 从本地存储获取 XSRF token

// 事件订阅发布器类，用于管理请求和响应的事件处理
class EventEmitter {
    constructor() {
        this.events = {}; // 用于存储事件及其回调函数的对象
    }

    // 订阅事件
    on(type, cbres, cbrej) {
        if (!this.events[type]) {
            this.events[type] = []; // 如果事件类型不存在，则初始化为空数组
        }
        this.events[type].push([cbres, cbrej]); // 将成功和失败的回调函数推入事件数组
    }

    // 发布事件
    emit(type, res, ansType) {
        if (!this.events[type]) return; // 如果没有订阅此事件类型，直接返回

        this.events[type].forEach((callback, index) => {
            if (ansType === 'resolve') {
                callback[0](res); // 如果 ansType 为 'resolve'，执行成功的回调
            } else {
                callback[1](res); // 如果 ansType 为 'reject'，执行失败的回调
            }
            // 删除已经执行过的回调函数
            this.events[type].splice(index, 1);
        });

        // 如果事件数组为空，则删除事件类型
        if (this.events[type].length === 0) {
            delete this.events[type];
        }
    }
}

// 根据请求配置生成唯一的key，用于识别请求
function generateKey(config, hash) {
    const { method, url, params, data } = config; // 解构请求配置中的必要信息
    return [method, url, JSON.stringify(params), JSON.stringify(data), hash].join('&'); // 生成唯一key并返回
}

// 判断是否为文件上传接口，文件上传通常使用FormData格式
function isFileUploadApi(config) {
    return Object.prototype.toString.call(config.data) === '[object FormData]';
}

// 用于存储挂起的请求的集合，防止重复请求
const pendingRequest = new Set();
// 实例化事件订阅发布器
const ev = new EventEmitter();

// 请求拦截器
instance.interceptors.request.use(
    async (config) => {
        // 如果存在 token，则将其附加到请求头中
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'; // 设置请求头为JSON格式
            config.headers['xsrf-Token'] = xsrfToken; // 附加 xsrf-Token 到请求头中
        }

        let hash = location.hash; // 获取当前页面的 hash 部分
        let reqKey = generateKey(config, hash); // 生成唯一的请求key
        //如果是文件 上传接口，直接返回请求配置 不需要处理
        if (isFileUploadApi(config)) return config;
        // 如果请求已经存在，则等待事件的触发
        if (pendingRequest.has(reqKey)) {
            try {
                // 创建一个新的Promise，等待事件的触发
                const res = await new Promise((resolve, reject) => {
                    ev.on(reqKey, resolve, reject); // 订阅该请求的事件
                });
                return Promise.reject({
                    type: "limiteResSuccess",
                    val: res
                });
            } catch (limitFunErr) {
                return Promise.reject({
                    type: "limiteResError",
                    val: limitFunErr
                });
            }
        } else {
            // 如果请求没有重复，添加到挂起请求集合中
            config.headers['reqKey'] = reqKey; // 将请求key添加到请求头中，供后续使用
            pendingRequest.add(reqKey); // 将请求key添加到挂起请求集合
        }
        return config; // 返回修改后的请求配置
    },
    (error) => {
        return Promise.reject(error); // 如果请求错误，直接返回错误信息
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        handleResSuccess_limit(response); // 成功响应时处理并发布成功事件
        return response; // 返回响应数据
    },
    (error) => {
        if (error.config) {
            return handleResError_limit(error); // 如果配置存在，处理并发布错误事件
        } else {
            return Promise.reject(error); // 如果没有配置，直接返回错误信息
        }
    }
);

// 处理请求响应的辅助函数
function handleResponse(eventType, resOrError, resolveType) {
    const reqKey = resOrError.config.headers['reqKey']; // 获取请求的key
    if (pendingRequest.has(reqKey)) {
        let x = null;
        try {
            x = JSON.parse(JSON.stringify(resOrError)); // 尝试将响应数据转换为JSON
        } catch (error) {
            x = resOrError; // 如果转换失败，直接使用原始数据
        }
        pendingRequest.delete(reqKey); // 从挂起请求集合中删除该请求
        ev.emit(reqKey, x, resolveType); // 触发事件并传递数据
    }
}

// 成功响应时的处理函数
function handleResSuccess_limit(res) {
    handleResponse('resolve', res, 'resolve'); // 发布成功事件
}

// 错误响应时的处理函数
function handleResError_limit(error) {
    if (error.type && error.type === "limiteResSuccess") {
        return Promise.resolve(error.val); // 如果是重复请求成功的结果，直接返回结果
    } else if (error.type && error.type === 'limiteResError') {
        return Promise.reject(error.val); // 如果是重复请求的错误，直接返回错误
    } else {
        handleResponse('reject', error, 'reject'); // 发布错误事件
    }
    return Promise.reject(error); // 返回处理后的错误信息
}

export default instance; // 导出 axios 实例