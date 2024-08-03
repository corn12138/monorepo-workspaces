import { createApp } from 'vue';// 引入vue
import "element-plus/dist/index.css"; // 引入element-plus的样式
import "../public/base.css"; // 引入公共样式
import AliMapCopper from './alimap.vue';


import EventEmitter from 'eventemitter3'; // 引入事件发射器
window._EE_ = new EventEmitter(); // 挂载到window上
window._AMapSecurityConfig = {
    securityJsCode: '58e95ab0680593ad116bc0f066604222'
};

const app = createApp(AliMapCopper);

app.config.errorHandler = function (err, vm, info) {    // 全局错误处理 
    //err 是错误的信息
    //vm 是错误的组件
    //info 是 Vue 实例中捕获的错误信息字符串
    console.error(err, vm, info);// 打印错误
    console.error(err,"错误信息");// 打印错误
    console.error({
        componets: vm,
        info: info
    },"错误组件");// 打印错误
}

app.mount('#root');