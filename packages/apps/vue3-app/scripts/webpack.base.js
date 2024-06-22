const path = require("path");
const MiniExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const Webpack = require("webpack")

module.exports = function (isDev) {
    return {
        entry: path.resolve(__dirname, "../src/main.ts"),
        // 使用webpack-dev-server 默认的打包不会生成 dist ,所以需要配置一下 writeToDisk:true
        devServer:{
            devMiddleware: {writeToDisk: isDev ? false : true,}
        },
        output: {
            path: path.resolve(__dirname, "../dist"),
            filename: 'static/js/[name].[fullhash:8].js',
            clean: true,
            publicPath: '/'
        },
        resolve: {
            extensions: [".vue", ".ts", ".js", ".css", ".less", ".json"],
            alias: {
                "@": path.resolve(__dirname, "../src")
            }
        },
        module: {

            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader"
                },
                {
                    test: /\.ts$/,
                    use:
                    {
                        loader: "ts-loader",
                        options: { appendTsSuffixTo: [/\.vue$/] }
                    }
                },
                {
                    test: /\.(tsx|jsx|js)$/,
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
                                isDev ? "style-loader" : MiniExtractPlugin.loader,
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
                                isDev ? "style-loader" : MiniExtractPlugin.loader,
                                "css-loader",
                                "postcss-loader"

                            ]
                        },
                        {
                            test: /\.less$/,
                            use: [
                                isDev ? "style-loader" : MiniExtractPlugin.loader,
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
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html')
            }),
            new MiniExtractPlugin({
                filename: isDev ? "static/css/[name].css" : "static/css/[name].[contenthash].css"
            }),
            new VueLoaderPlugin(),
            new Webpack.DefinePlugin({
                __VUE_OPTIONS_API__: false,  // 如果你只使用 Composition API，则设为 false
                __VUE_PROD_DEVTOOLS__: false,  // 生产环境建议设为 false
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false  // 生产环境建议设为 false
            })
        ]

    }
}
