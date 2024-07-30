## 关于高德地图截图的实现

截图的实现原理比较简单，就是将当前地图的canvas to image，然后再在这张image上进行截图。

问题1 高德地图（不知道其他地图有没有），利用了webgl的缓存画图，所以直接用canvas toDataUrl() 方法截出来的是白色的图。基本上被这个设定玩死了。解决办法

``` javascript
HTMLCanvasElement.prototype.getContext = (function (origFn) {
                return function (type, attributes) {
                    if (type === "webgl") {
                        attributes = Object.assign({}, attributes, {
                            preserveDrawingBuffer: true,
                        });
                    }
                    return origFn.call(this, type, attributes);
                };
})(HTMLCanvasElement.prototype.getContext);
```

或者简单点

``` javascript
new AMap.Map('container', {
        //加上这串代码
        WebGLParams:{ 
          preserveDrawingBuffer:true 
        }
}
```

我选择第二个，相对简单点

问题2 地图截出来的尺寸和展示在页面上的组件尺寸不一样，内容是一致的。但是需要调整截出来的图的尺寸。其它没什么记录的。