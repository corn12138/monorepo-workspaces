// 只是 不断的 执行函数 ，参数本身不传递
// 我在执行流程的时候 参数无需返回
// 流程编排



// 同步的
const syncFn = (fns) => (rest) => {
    return fns.reduce((_, item) => item(rest), {});
};

// 瀑布式 --依赖于前一个函数的 返回值，会是下一个函数的入参
waterfallSyncFn = (fns) => (rest) => {
    return fns.reduce((total, item) => item(total), rest);
}

// 熔断--- boil式 --依赖于 中间的返回值；如果前一个函数返回了特定值 ，如undefined ,那么后续的将不会再执行了
const boilSyncFn = (fns) => (rest) => {
    return fns.reduce((total, item) => (total ? item(total) : total), rest);
}

// 异步的方式
asyncFn = (fns) => (rest) => new Promise((resolve, reject) => {
    fns.reduce((total, item) =>
        total.then((_) => item(rest)).catch(reject),
        Promise.resolve(rest)
            .then(resolve))
})

waterfallAsyncFn = (fns) => (rest) => new Promise((resolve, reject) => {
    fns.reduce((total, item) =>
        total.then((_) => item(rest)).catch(reject),
        Promise.resolve(rest)
            .then(resolve))
})

boilAsyncFn = (fns) => (rest) => new Promise((resolve, reject) => {
    fns.reduce((total, item) =>
        total.then((_) => item(rest)).catch(reject),
        Promise.resolve(rest)
            .then(resolve))
})




function Pa(ctx) {
    ctx.pa = 'pa';
    console.log(ctx, "hello Pa");
    return { loga: "loag" }
};
function Pb(ctx) {
    ctx.pb = 'pb';
    console.log(ctx, "hello Pb");
    return { logb: "lobg" }
};
function Pc(ctx) {
    ctx.pc = 'pc';
    console.log(ctx, "hello Pc");
    return {}
};

const data = {
    nodes: [{ name: "foo", val: "myFoo" }, { name: "bar", val: "myBar" }, { name: "bar2", val: "myBar2" }]
}

const resolveFormat = (data) => {

    if (data?.nodes&&data?.nodes instanceof Array) {
        return data;
    }else{
        return {
            nodes:[]
        }
    }
};

const resolveNodes = (data)=>{
    return data.nodes.reduce((total,cur)=>{
        return {
            ...total,
            [cur.name]:[cur.val]
        }
    },{});
};

// 不同环境使用的时候 ，可能存在多种用法，使用 小的原子化的 方法 转换一下 
const pipe = waterfallSyncFn([resolveFormat,resolveNodes]);
console.log("=====>",pipe(data))

// const newPipe = waterfallSyncFn([Pa, Pb, Pc]);
// newPipe({});



