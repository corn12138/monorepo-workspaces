const { getOptions } = require('loader-utils');

const { validate } = require('schema-utils'); // 引入schema-utils模块
const babel = require('@babel/core'); // 引入babel-core模块
const util = require('util'); // 引入util模块
const schema = require('./schema.json');// 引入schema.json文件
const _transform = util.promisify(babel.transform); // 将babel.transform方法转换成Promise对象

module.exports = function (content, map, meta) {

    const _options = getOptions(this) || {}; // 获取loader的options
    validate(schema, _options, { name: 'babelLoader' }); // 使用schema.json校验options

    const callback = this.async(); // 获取异步回调函数

// 执行翻译
    _transform(content, _options).then(({ code, map }) => {
        callback(null, code, map, meta);
    }).catch((err) => {
        callback(err);
    }); // 调用_transform方法


}