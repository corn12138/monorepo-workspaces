const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (isDev) {

    return {
        entry: path.resolve(__dirname, "../src/index.tsx"),
        // devServer: {
        //     devMiddleware: {
        //         writeToDisk: isDev ? false : true, // Ensure files are written to disk in the dev server,
        //     }
        // },
        output: {
            //打包输出
            path: path.resolve(__dirname, "../dist"),
            //输出js的名称
            filename: "static/js[name].[contenthash].js",
            clean: true, //webapck5  内置的clean 
            publicPath: "/", //针对 public文件夹内的文件的 打包后的路径
        },
        //优化索引 --
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.json',".less",".css"]
        },


        //loader --解析 tsx ts css less 等后缀
        rules: [
            //处理 tsx 等文件的 Babel转译
            {
                test: /\.(tsx|ts|jsx|js)$/,
                use: {
                    loader: "babel-loader"
                }
            },
            // 针对css  的编译 
            {
                oneOf: [
                    {
                        test: /.module\.(less|css)$/,
                        include: [path.resolve(__dirname, "../src/**/*")],
                        use: [
                            isDev ? "style-loader" : MiniCssExtractPlugin.loader
                            ,
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        localIdentName: "[path][name]__[local]--[hash:base64]"
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
            // 处理静态文件的
            {
                test: /\.(png|jpg|jpeg|webp|gif|svg)$/,
                generator: {
                    filename: 'static/images/[name].[contenthash][ext]'
                }
            },
            {
                test: /\.(mp4|mp3|wmv|flv|rvmb)$/,
                generator: {
                    filename: 'static/media/[name].[contenthash][ext]'
                }
            },
            {
                test: /\.(woff2|eot|ttf|otf)$/,
                generator: {
                    filename: 'static/fonts/[name].[contenthash][ext]'
                }
            },


        ]
    },
    //plgins 插件
    {
        plugins: [
            //目的是将生成的js css 注入到 我的html 模板里
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "../public/index.html")
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? "static/css/[name].css" : "static/css/[name].[contenthash].css"
            })
        ]
    }
}