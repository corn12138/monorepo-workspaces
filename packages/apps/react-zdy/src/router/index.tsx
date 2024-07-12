import React from "react";

import { RouteObject } from "react-router-dom"

export interface ExtraBizObject {
    title?:string
}
//定义 类型 
export type ZRouter = RouteObject&ExtraBizObject;

export const router: Array<ZRouter> = [
    {
        path:"/",element:<div>首页</div>,title:"首页",
        children:[
            {}
        ],
    },
    {
        path:"/frontPage",element:<div>好文翻译</div>,
        title:"好文翻译"
    },
    {
        path:"/archive",element:<div>存档</div>,
        title:"存档"
    },
    {
        path:"/testPage",element:<div>测试</div>,
        title:"测试"
    },
]