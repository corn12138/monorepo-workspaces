const {merge} = require("webpack-merge");
const getBaseCfg = require("./webpack.base.js");

const CssMinimizerPlugin= require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = merge(getBaseCfg(false),{
    mode:"production",

    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel:true,
                terserOptions:{
                    compress:{
                        pure_funcs:["console.log","console.warn"]
                    }
                }
            })
        ],
        // 代码自动分包
        splitChunks:{
            cacheGroups:{
                vendors:{
                    name:"vendors",
                    test:/node_modules/,
                    miniChunk:3,
                    miniSize:10
                },
                commons:{
                    name:"commons"
                }
            }
        }
    }
});