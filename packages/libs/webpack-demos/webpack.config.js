const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'output')
    },
    mode: 'none',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(), //build之前清理output目录
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: path.resolve(__dirname, 'loaders', 'babelLoader'),
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    }

};