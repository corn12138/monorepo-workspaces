
// 
const CreateStore = function (opts = {}) {
    // 初始化
    this.unLocal = opts.unLocal;
    this.shouldFetch = opts.shouldFetch;
    this.maxLength = opts.maxLength || 30;
    this.expireTime = opts.expireTime || NaN;
    this.plugins = opts.plugins || [];
    this, now = Date.now();
    // 
    this.observe();
}

CreateStore.prototype.observe = function () {
    const that = this;
    this.__mock__storage = new Proxy({}, {
        get(target, propKey, receiver) {
            let result;
            if (!that.unLocal) {
                // 若需要存本地，我直接存进去
                result = (that.getItem() || Reflect.get(target, propKey, receiver));
            } else {
                result = Reflect.get(target, propKey, receiver);
            };

            return result;
        },
        set(target, propKey, value, receiver) {
            let _value = value;
            // 我在这里劫持数据，原因 有可能 ，我还有其他的选项
            if (value instanceof Array && value.length > that.maxLength) {
                _value = value.slice(0, maxLength);
            };

            if (that.expireTime && this.expireTime + that.now() < Date.now()) {
                // ......
            }

            if (that.shouldFetch) {
                // ....
            }

            if(!that.unLocal){
                // 要存本地
                that.setItem(propKey,_value);
            }

            return Reflect.set(target,propKey,value,receiver);
        }
    });
};

// 获取
CreateStore.prototype.getItem = function (type) {
    let data;
    try {
        data = window[this.storageMethod].getItem(type)
    } catch (error) {
        console.error("没有Window", error)
    };
    let dataJson;
    try {
        dataJson = JSON.parse(data);
    } catch (error) {
        console.error(error);
    };
    return dataJson;

}
// 存储
CreateStore.prototype.setItem = function (type, data) {
    const dataJson = JSON.stringify(data);
    try {
        data = window[this.storageMethod].setItem(dataJson)
    } catch (error) {
        console.error("没有Window", error)
    };
}


// 对外提供的 API
CreateStore.prototype.get = function (type) {
    return this.__mock__storage[type];
}
CreateStore.prototype.set = function (type, data) {
    this.__mock__storage[type] = data;
}

const methodArr = ["pop","push","unshift","shift","reverse","splice","sort"];
methodArr.forEach((method)=>{

    CreateStore.prototype[method] = function (type,...rest){


        if(!this.get(type)){
            this.set(type,[]);
        };

        if(!(this.get(type) instanceof Array)){
            throw new Error("must be Array")
        }

        const dataList = this.get(type);
        Array.prototype[method].apply(dataList,rest);
        this.set(type,dataList);
    }
})


const CreateLocalStore = function (...rest) {
    CreateStore.apply(this, rest);
    this.storageMethod = 'localStorage';
}
// 组合寄生式 继承
CreateLocalStore.prototype = Object.create(CreateStore.prototype);
CreateLocalStore.prototype = Object.create(CreateStore.prototype);

const CreateSessionStore = function (...rest) {
    CreateStore.apply(this, rest);
    this.storageMethod = 'sessionStorage';

};


// 用例 TEST
const localStore = new CreateLocalStore();
localStore.set("hello",["this is the data"]);
localStore.push("hello","new Array")
console.log(localStore.get("hello"), "====================");