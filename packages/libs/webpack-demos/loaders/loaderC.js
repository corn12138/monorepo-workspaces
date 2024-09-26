const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils'); // 引入schema-utils模块
const schema = require('./schema.json');// 引入schema.json文件



module.exports = function (content, map, meta) {

    const _options = getOptions(this) || {}; // 获取loader的options
    console.log(" i am " + _options.name);
    validate(schema, _options, { name: 'loaderKing' }); // 使用schema.json校验options
    return content;
}

// pitching 阶段
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('pitching loaderC is excuted');
}