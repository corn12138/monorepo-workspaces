import axios from 'axios';

//创建axios实例
let instance = axios.create({
    baseURL: 'http://localhost:3000/api', // api的base_url
    timeout: 1000, // 请求超时时间
    withCredentials: false, // 跨域请求时是否需要使用凭证
    withXSRFToken: false, // 是否需要传递xsrfToken
});

let token = localStorage.getItem('token');
let xsrfToken = localStorage.getItem('xsrfToken');

// 事件订阅发布
class EventEmitter {
    constructor() {
        this.events = {};
    }
    // 订阅事件
    on(type, cbres, cbrej) {
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push([cbres, cbrej]);
    }
// 发布事件
    emit(type, res, ansType) {
        if (!this.events[type]) return;
        this.events[type].forEach((callback) => {
            // ansType 为 resolve 时执行第一个回调，为 reject 时执行第二个回调
            if (ansType === 'resolve') {
                callback[0](res);
            } else {
                callback[1](res);
            }
        });
        delete this.events[type]; // 删除事件
    }
}
function generateKey(config, hash) {
    // 生成唯一key
    const { method, url, params, data } = config;
    // 生成key
    return [method, url, JSON.stringify(params), JSON.stringify(data), hash].join('&');
}

// 判断是否为文件上传接口
function isFileUploadApi(config) {
    return Object.prototype.toString.call(config.data) === '[object FormData]';
}

// 请求拦截器
const pendingRequest = new Set();
// 事件订阅发布
const ev = new EventEmitter();

instance.interceptors.request.use(
    async (config) => {
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            config.headers['xsrf-Token'] = xsrfToken;
        }
// 获取hash
        let hash = location.hash; // 获取当前路由hash
        // 生成唯一key
        let reqKey = generateKey(config, hash);

        if (isFileUploadApi(config) && pendingRequest.has(reqKey)) {
            try {
                const res = await new Promise((resolve, reject) => {
                    ev.on(reqKey, resolve, reject);
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
            config.reqKey = reqKey;
            pendingRequest.add(reqKey);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        handleResSuccess_limit(response);
        return response;
    },
    (error) => {
        if (error.config) {
            return handleResError_limit(error);
        } else {
            return Promise.reject(error);
        }
    }
);

function handleResponse(eventType, resOrError, resolveType) {
    const reqKey = resOrError.config.reqKey;
    if (pendingRequest.has(reqKey)) {
        let x = null;
        try {
            x = JSON.parse(JSON.stringify(resOrError));
        } catch (error) {
            x = resOrError;
        }
        pendingRequest.delete(reqKey);
        ev.emit(reqKey, x, resolveType);
        delete ev.events[reqKey];
    }
}

function handleResSuccess_limit(res) {
    handleResponse('resolve', res, 'resolve');
}

function handleResError_limit(error) {
    if (error.type && error.type === "limiteResSuccess") {
        return Promise.resolve(error.val);
    } else if (error.type && error.type === 'limiteResError') {
        return Promise.reject(error.val);
    } else {
        handleResponse('reject', error, 'reject');
    }
    return Promise.reject(error);
}

export default instance;