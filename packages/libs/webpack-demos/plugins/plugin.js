const { set } = require("lodash");

class plugins {
    apply(compiler) {
        // 不同的生命周期
        compiler.hooks.emit.tap('Plugin1', (compilation, callback) => {
            console.log('hooks emit');
            // callback();
        });
        compiler.hooks.afterEmit.tap('Plugin1', (compilation, callback) => {
            console.log('hooks afterEmit');
            // callback();
        });
        // 处理异步逻辑
        compiler.hooks.afterEmit.tapAsync('Plugin1', (compilation, callback) => {
            setTimeout(() => {
                console.log('hooks afterEmit tapAsync');
                callback();
            }, 1000);
        });
        // 处理promise逻辑
        compiler.hooks.afterEmit.tapPromise('Plugin1', (compilation) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('hooks afterEmit tapPromise');
                    resolve();
                }, 1000);
            });
        });
    }
}