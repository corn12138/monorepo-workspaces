import { createApp } from "vue";
import App from "./app.vue";
import  router  from "./router/index.js";
import store from "./store/index.js";
import "./App.css";
const app = createApp(App);// 创建应用实例
app.use(router);// 使用路由
app.use(store);// 使用状态管理
app.mount("#root");// 挂载到根节点