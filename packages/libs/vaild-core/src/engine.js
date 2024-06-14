//  run ---运行的
export const mixinEngine = function (VaildCore) {
    VaildCore.prototype.runWithStep = function (curStep) {
        return this.__run(curStep)
    }

    VaildCore.prototype.__run = function (curStep) {
        this.context.current = {
            loggin: []
        };

        (curStep || this.steps)
            .reduce((prev, cur) => {
                return [...prev, ...this.plugins[cur]]
            }, []).reduce((prochain, proCur) => {
                return prochain.then(res => {
                    return proCur(res);
                })
            }, Promise.resolve(this.context));
    }

    VaildCore.prototype.rePipe = function (arr) {
        this.steps = arr;
    }

    // run 运行plugin的方法
    VaildCore.prototype.run = function (ctx, callback) {
        // const { stepInfo, stepValid, stepPost } = this.plugins;
        // [...stepInfo, ...stepValid, ...stepPost].reduce((prochai,proCur)=>{
        //     return prochai.then((res) => {
        //         return proCur(res)
        //     })
        // },Promise.resolve(this.context));
        return this.__run()
    }
}