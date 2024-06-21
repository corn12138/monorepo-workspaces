const {merge} = require("webpack-merge");
const getBaseCfg = require('./webpack.base.js');
const path = require("path");

module.exports = merge(getBaseCfg(true),{

    mode:"development",
    devtool:"eval-cheap-module-source-map",
    devServer:{
        port:8089,
        compress:false,
        hot:true,
        historyApiFallback:true,
        static:{
            directory:path.join(__dirname,"../public/index.html")
        }
    }
})