


// 一个标准的plugins 的预期形式
// plugin的标准，由 谁开发core 谁就可以 定义

// 
/**
 * 1. 所有的plugin 必须是promise的形式
 * --第一个参数，是上下文，全局生效 ctx （compliation）
 * --第二个参数，是一个插件可选参数，在使用特定插件时 进行传入
 * 
 */
const phoneValidPlugin = (ctx, match) => {

    return new Promise((resolve, reject) => {
        console.log(`手机号按照 ${match} 的正则校验 中。。。。。。`)
        console.log("校验成功")
        resolve(ctx)
    });

};
// 接口提交校验
const postUrlPlugin = (ctx, url) => {
    return new Promise((resolve, reject) => {
        console.log(`接口提交至 ${url} 中`)
        setTimeout(() => {
            console.log("提交完成")
            resolve(ctx)
        }, 1000);
    });
};


// 
export const initialPlugins = {
    phoneValidPlugin, postUrlPlugin
}