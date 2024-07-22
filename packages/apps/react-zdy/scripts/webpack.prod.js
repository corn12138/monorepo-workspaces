const getBaseConfig = require("./webpack.base");

const { merge } = require("webpack-merge")

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const TerserPlugin = require("terser-webpack-plugin")

//source map 源码 上传错误监控平台
const SentryWebpackPlugin = require("@sentry/webpack-plugin")

module.exports = merge(getBaseConfig(false), {
    mode: "production",
    // 优化
    optimization: {
        minimize: true,
        minimizer: [new MiniCssExtractPlugin(), new TerserPlugin({
            parallel: true,
            terserOptions: {
                compress: {
                    pure_funcs: ["console.log", "console.warn"]
                }
            }
        })
        ],
        //splitchunks ---分包
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },

        }
    },
    //plugins
    plugins: [
        // new SentryWebpackPlugin({
        //     include:"../dist",
        //     ignore:["node_modules"],
        //     urlPrefix:"~/static/js",
        //     release:"1.0.0", //版本号
        // })
    ]
})