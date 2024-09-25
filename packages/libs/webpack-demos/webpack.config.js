const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
const { size } = require("lodash");
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
                loader: path.resolve(__dirname, 'loaders', 'loaderA'),
                options: {
                    // presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.js$/,
                loader: path.resolve(__dirname, 'loaders', 'loaderB'),
                options: {
                    // presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.js$/,
                loader: path.resolve(__dirname, 'loaders', 'loaderC'),
                options: {
                    // presets: ['@babel/preset-env'],
                    name: 'loaderKing',
                    size: 1000 // 传入一个不符合schema.json的参数
                }
            },
            {
                test: /\.js$/,
                loader: path.resolve(__dirname, 'loaders', 'babelLoader'),
                options: {
                    presets: ['@babel/preset-env']
                }
            },
        ]
    }

};