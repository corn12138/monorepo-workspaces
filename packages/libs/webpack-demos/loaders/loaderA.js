


// 同步类型的loader
module.exports = function(content,map,meta){
    console.log('loaderA is 同步的loader');
    this.callback(null,content,map,meta);
}
// pitching 阶段
module.exports.pitch = function(remainingRequest, precedingRequest, data){
    console.log('pitching loaderA is excuted');
}
