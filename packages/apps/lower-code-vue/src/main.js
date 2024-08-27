import { createApp } from "vue";
import App from "./app.vue";
import  router  from "./router/index.js";
import store from "./store/index.js";
import "./App.css";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from "element-plus/es/locale/lang/zh-cn";
const app = createApp(App);// 创建应用实例
app.use(router);// 使用路由
app.use(store);// 使用状态管理
app.use(ElementPlus, { locale: zhCn });// 使用element-plus
app.mount("#root");// 挂载到根节点