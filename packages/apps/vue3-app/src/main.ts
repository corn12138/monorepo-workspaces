
import "./index.less";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
//全局错误处理
app.config.errorHandler = (err, instance, info) => {
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    console.error(err, instance, info); 
};
app.mount("#app");

