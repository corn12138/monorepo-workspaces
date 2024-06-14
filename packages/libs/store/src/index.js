
// 
const CreateStore = function (opts = {}) {
    // 初始化
    this.unLocal = opts.unLocal;
    this.shouldFetch = opts.shouldFetch;
    this.maxLength = opts.maxLength || 30;
    this.expireTime = opts.expireTime || NaN;
    this.plugins = opts.plugins || [];
    // 
    this.observe();
}

CreateStore.prototype.observe = function () {
 this.__mock__storage = new Proxy({},{

 });
}

// 对外提供的 API
CreateStore.prototype.get = function (type) {
    return this.__mock__storage[type];
}
CreateStore.prototype.set = function (type,data) {
     this.__mock__storage[type] = data;
}



const CreateLocalStore = function (...rest) {
    CreateStore.apply(this, rest);
    this.storageMethod = 'localStorage';
}
// 组合寄生式 继承
CreateLocalStore.prototype = Object.create(CreateStore.prototype);
CreateSessionStore.prototype = Object.create(CreateStore.prototype);

const CreateSessionStore = function (...rest) {
    CreateStore.apply(this, rest)
    this.storageMethod = 'sessionStorage'

}
