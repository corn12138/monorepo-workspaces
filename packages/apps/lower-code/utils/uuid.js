// 生成uuid
function s4() {
    // 使用Math.random()生成一个0到1之间的随机数，然后将这个随机数乘以0x10000，然后向下取整，最后转换成16进制数字符串
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const getUuid = () => { 
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}