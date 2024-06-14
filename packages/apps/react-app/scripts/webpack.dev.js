const webpack = require('webpack');
const getBaseCfg = require("./webpack.base");
const path = require("path");
const {merge} = require("webpack-merge");

module.exports = merge(getBaseCfg(true),{
//     开发环境的相关配置
    mode: 'development',
//     源码调试
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port:3000,//端口
        hot: true,//热更新
        historyApiFallback: true, //history 路由下的404 问题

        static: {
           //  托管静态文件的 public文件夹
           directory: path.resolve(__dirname, '../public'),
        }
    }

})