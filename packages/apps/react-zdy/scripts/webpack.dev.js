const getBaseConfig = require("./webpack.base");

const path = require("path")

const { merge } = require("webpack-merge");

module.exports = merge(getBaseConfig(true),{
    mode:"development",
    // 开启 源码调试
    devtool:"eval-cheap-module-source-map",
    devServer:{
        port:3008,
        hot:true,
        compress:true,
        historyApiFallback:true,
        static:{
            directory:path.resolve(__dirname,"../public")
        }
        //proxy:{}
    }
})