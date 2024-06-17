
const babel = require('rollup-plugin-babel');
// webpack -> entry -> output, plugins
// rollup  -> input -> output, plugins
// 为什么node可以直接运行的程序也要打包？ koa 
// 因为 es6, 装饰器, 高版本语法，在 node 14 等，可能运行不起来。

module.exports = {
    input: "./src/index.js",
    output: {
        file:'./dist/bundle.js',
        format: 'umd',
        name: "xwServer"
    },

    treeshake: false,

    plugins: [
        babel({
            runtimeHelpers: true,
            extensions: ['.js', '.ts'],
            exclude: 'node_modules/**',
            externalHelpers: true,
        })
    ],
    external: id => /node_modules/.test(id)
};
