const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = function (isDev) {
    return {
        // 1. 输入输出部分
        // 最基础的，就是我的入口
        entry: path.resolve(__dirname, "../src/index.tsx"),
        devServer: {
            // 使用webpack-dev-serve  默认 打包是不会生成 dist的 ,所以需要配置一下 writeToDisk:true
            devMiddleware: {
                writeToDisk:isDev?false: true, // Ensure files are written to disk in the dev server,
            }
        },
        output: {
            // 打包输出的结果路径
            path: path.resolve(__dirname, "../dist"),
            // 每个输出的 js 的名称
            // hash, chunkhash, contenthash 
            filename: "static/js/[name].[hash:8].js",
            // webpack 4 没有，clean-webpack-plugin
            // webpack 5 内置，构建前删除一下 dist
            clean: true,
            // 打包后的公共路径
            publicPath: "/"
        },
        // 2. resolve 部分
        // 让我的文件，优化索引依赖的。
        // 用于引入模块时，可以不带文件后缀，本质也是一个优先级的顺序，可能会影响构建性能
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },

        // 3. loader 部分
        module: {
            // loader 就是在你动如文件，去解析各种import from 的文件时
            // 针对不同类型的文件，给到不同的处理方法，这个不同后缀的文件
            // 需要有一个解析器，去识别这些文件的内容
            rules: [
                {
                    test: /\.(tsx|ts|jsx|js)$/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    oneOf: [
                        {
                            test: /\.module\.(less|css)$/,
                            include: [path.resolve(__dirname, "../src")],
                            use: [
                                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                                {
                                    loader: "css-loader",
                                    options: {
                                        modules: {
                                            // 我们可以借助 css-module， 实现
                                            localIdentName: "[path][name]__[local]--[hash:base64:5]"
                                        }
                                    }
                                },
                                "postcss-loader",
                                "less-loader"
                            ]
                        },
                        {
                            test: /\.css$/,
                            use: [
                                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                                "css-loader",
                                "postcss-loader"
                            ]
                        },
                        {
                            test: /\.less$/,
                            use: [
                                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                                "css-loader",
                                "postcss-loader",
                                "less-loader"
                            ]
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|webp|gif|svg)$/,
                    generator: {
                        filename: "static/images/[name].[contenthash:8][ext]"
                    },
                },
                {
                    test: /\.(mp4|mp3|wmv|flv|rvmb)$/,
                    generator: {
                        filename: "static/media/[name].[contenthash:8][ext]"
                    },
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/,
                    generator: {
                        filename: "static/fonts/[name].[contenthash:8][ext]"
                    },
                }
            ]
        },

        // 4. 插件部分
        plugins: [
            new HtmlWebpackPlugin({
                // 我们要把生成的 js 和 css， 注入到一个 HTML 模板中
                template: path.resolve(__dirname, "../public/index.html")
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? "static/css/[name].css" :
                    "static/css/[name].[contenthash:4].css"
            })
        ]










    }
}