import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

import ControllerClass from "./controllers/index"
import { controllers } from "./utils/decorator";
import { jwtVerify } from "./utils/jwt";



const app = new Koa();

const router = new Router();

app.use(bodyParser());


app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Header", "*");
    ctx.set("Access-Control-Allow-Methods", "*");
    ctx.set("Content-Type", "application/json;charset=utf-8");
    if (ctx.request.method.toLowerCase() === 'options') {
        ctx.state = 200;
    } else {
        await next(ctx);
    }
});

// jwt
app.use(jwtVerify(
    [
        // 跳过这两个接口的验证
        "/api/user/login",
        '/api/user/register'
    ]
));

const COMMON_API = '/api';

controllers.forEach(item => {
    let { method, path, handler, constructor } = item;
    const { prefix } = constructor;
    if (prefix) {
        path = `${COMMON_API}${prefix}${path}`
    } else {
        path = `${COMMON_API}${path}`
    };
    router[method](path, handler)
})

app.use(router.routes());

app.listen(4000, () => {
    console.log('4000 is listening')
})