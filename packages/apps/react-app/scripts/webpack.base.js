const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (isDev) {
    return {
    //     1.输入输出部分
    //     最基础的-->我的入口
        entry: path.resolve(__dirname,"../src/index.tsx"),
        output:{
        //     打包输出路径
            path: path.resolve(__dirname,"../dist"),
        //     每个输出的JS名称 hash chunkhash contenthash
            filename: "static/js/[name].js",
        //     webpack4没有内置 clean-webpack-plugin
        //     webpack5 内置了,所以
            clean:true,
        //     打包后的公共路径
            publicPath:"/"
        },

    //     2.resolve部分
    //     让我的文件，优化索引依赖
        resolve:{
            // 就是 import的时候 可以省略 .ts
            extensions: ['.ts','.js','.jsx','.tsx']
        },
    //    3.loader部分
        module:{
        //     loader 就是在你动 如 文件 去解析 各种import from 的文件时
        //     针对不同类型的文件，给到不同的处理方法，这个不同的后缀文件
        //     需要有一个解析器，去识别这些文件的内容
            rules:[
                {
                    // 针对这类文件的loader解析
                    test: /\.(tsx|ts|js|jsx)?$/,
                    use:{
                        loader:'babel-loader'
                    }
                },
                {
                oneOf:[
                    {
                        test: /\.module\.(less|css)$/,
                        include: [path.resolve(__dirname,"../src")],
                        use:[
                            isDev ?"style-loader":MiniCssExtractPlugin.loader,
                            {
                                loader:'css-loader',
                                options:{
                                    modules: {
                                    //     我们可借助    css-module 来实现
                                       localIdentName: "[path][name]__[local]___[hash:base64:5]",
                                    }
                                }
                            },
                            "postcss-loader",
                            "less-loader"
                        ]
                    },
                    {
                        test: /\.css$/,
                        use:[
                            isDev ?"style-loader":MiniCssExtractPlugin.loader,
                            "css-loader",
                            "postcss-loader",
                        ]
                    },
                    {
                        test: /\.less$/,
                        use:[
                            isDev ?"style-loader":MiniCssExtractPlugin.loader,
                            "css-loader",
                            "postcss-loader",
                            "less-loader"
                        ]
                    }

                ]
                },
                {
                    test: /\.(jpg|jepg|gif|webp|svg|png)$/,
                    generator:{
                        filename:"static/images/[name].[contenthash:8].[ext]",
                    }
                },
                {
                test: /\.(mp4|mp3|wmv|rmvb|avi|flv)$/,
                    generator: {
                    filename:"static/media/[name].[contenthash:8].[ext]",
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/,
                    generator:{
                        filename:"static/fonts/[name].[contenthash:8].[ext]",
                    }
                }
            ]
        },
    //     4.插件部分
        plugins:[
            new MiniCssExtractPlugin({
                filename:isDev? "static/css/[name].css":"static/css/[name].css",
            }),
            new htmlWebpackPlugin({
                // 把生成的 js 和css，注入到 html
                template:path.resolve(__dirname,"../public/index.html"),
            })
        ]
    }
}