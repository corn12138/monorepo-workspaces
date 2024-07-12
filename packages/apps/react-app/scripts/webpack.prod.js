const { merge } = require('webpack-merge');
const path = require('path');
const getWebpackConfig = require('./webpack.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const { plugin } = require('postcss');
const ZipPlugin = require('../zipPlugin');

module.exports = merge(getWebpackConfig(false), {
    //     生产配置
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new MiniCssExtractPlugin(), new TerserPlugin({
            parallel: true,
            terserOptions: {
                compress: {
                    pure_funcs: ["console.log", "console.warn"],
                }
            }
        })],
        //     代码自动分包
        // splitChunks: {
        //     cacheGroups: {
        //         vendors:{
        //             name:"vendors",
        //             test: /node_modules/,
        //             // minChunks:1,
        //             // miniSize:
        //         },
        //         commons:{
        //             name:"commons",
        //         }
        //     }
        // },
    },


    // 使用 自己编写的插件 
    plugins: [
        new ZipPlugin({ filename: "teach.zip" })
    ]
})