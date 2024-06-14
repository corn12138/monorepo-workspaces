// 所有插件
import { initialPlugins } from "./initialPlugins"

export const mixinPlugin = function (VaildCore) {
    // 增plugin
    VaildCore.prototype.addPlugin = function (step, callback) {
        if (this.steps.includes(step)) {
            this.plugins[step].push(callback)

        } else {
            console.error(`the status ${step} is not vaild step`)
        }
    };

    // 使用自定义开发的插件
    VaildCore.prototype.usePlugins = function (step, pluginName, ...params) {
        if (this.steps.includes(step)) {
            // 
            if (initialPlugins[pluginName]) {
                this.plugins[step].push((ctx) => initialPlugins[pluginName](ctx, ...params));
            } else {
                console.error(`the initialPlugins ${pluginName} is not vaild initialPlugin name`)
            }

        } else {
            console.error(`the status ${step} is not vaild step`)
        }
    }
}