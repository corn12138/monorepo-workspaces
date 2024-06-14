import { mixinEngine } from './engine'; //启动
import {mixinPlugin} from './plugins'; //插件合集
import {mixinLog} from './log'; //log 


export const VaildCore = function () {
    this.init();
};
// 初始化
VaildCore.prototype.init = function () {

    this.steps = ["stepInfo", "stepValid", "stepPost"];

    // 多个插件
    this.plugins = this.steps.reduce((pro, current) => {
        return {
            ...pro,
            [current]: []
        }
    }, {});
// 初始化 一些数据
    this.context = {
        loggin:[],
        current: {},

    }
    // console.log(this.plugins,"///////",this)
};

//剥离 
mixinEngine(VaildCore);
mixinLog(VaildCore);
mixinPlugin(VaildCore);



// test 用例
// const core = new VaildCore();

// core.addPlugin("stepInfo", (ctx) => {
//     return new Promise((resolve, reject) => {
//         console.log("ctx1",ctx)
//         resolve(ctx);
//     })
//     // console.log("ctx1",ctx)
//     // ctx.loggin.push("ctx1");
//     // return ctx;
    
// })
// core.addPlugin("stepInfo", (ctx) => {
//     console.log("ctx2")
//     ctx.loggin.push("ctx2")
//     return ctx;
// });
// core.addPlugin("stepInfo", (ctx) => {
//     console.log("ctx3")
//     ctx.loggin.push("ctx3")
//     return ctx;
// })

// // usePlugins
// core.usePlugins("stepPost", "postUrlPlugin", "http://xxx/xxx");
// core.addPlugin("stepPost",(ctx)=>{
//     console.log("所有日志：",...ctx.loggin)
// })
// core.run();
// console.log(core, "core")