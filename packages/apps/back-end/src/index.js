import Koa from "koa";
import Router from "koa-router";

import ControllerClass from "./controllers/index"
import { controllers } from "./utils/decorator";



const app = new Koa();

const router = new Router();


app.use(async (ctx,next)=>{
    ctx.set("Access-Control-Allow-Origin","*");
    ctx.set("Access-Control-Allow-Header","*");
    ctx.set("Access-Control-Allow-Methods","*");
    ctx.set("Content-Type","application/json;charset=utf-8");
    if(ctx.request.method.toLowerCase()==='options'){
        ctx.state = 200;
    }else{
        await next(ctx);
    }
});

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