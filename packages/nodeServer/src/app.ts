import Koa from "koa";
import BodyParser from "koa-bodyparser"; //解析请求体的

const app = new Koa();
app.use(BodyParser());

export default app;

