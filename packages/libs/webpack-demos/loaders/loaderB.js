

// 异步的loader
module.exports = function(content,map,meta){
    console.log('loaderB is 异步的loader');
    const callback = this.async();
    setTimeout(()=>{
        callback(null,content);
    },1000);
    return content;
};
// pitching 阶段
module.exports.pitch = function(remainingRequest, precedingRequest, data){
    console.log('pitching loaderB is excuted');
}