// log--add/get log 
export const mixinLog = function (VaildCore) {
    VaildCore.prototype.addLog = function (str, ctx) {
        return new Promise((resolve, reject) => {
            let ctxs = ctx.current.loggin.push(str)
            resolve(ctxs);
        });
        // return  ctx.current.loggin.push(str);
    }

    VaildCore.prototype.getLog = function (str, ctx) {
        return ctx.current.loggin
    }
}