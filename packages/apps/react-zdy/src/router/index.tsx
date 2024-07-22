import React,{lazy} from "react";

import { RouteObject } from "react-router-dom"
//
// import Home from "../pages/home/index"
const Home = lazy(()=>import("../pages/home/index")); //HOME页 懒加载

import Test from "../pages/testPages/index"


export interface ExtraBizObject {
    title?: string
}
//定义 类型 
export type ZRouter = RouteObject & ExtraBizObject;

export const router: Array<ZRouter> = [
    {
        path: "/", element:<Home />, title: "首页",
        children: [
            {
                path: "frontPage", element: <div>好文翻译</div>,
            },
            {
                path: "archive", element: <div>存档</div>,

            },
            {
                path: "testPage", element: <Test />,
            },
            { path: "zvideo", element: <div>视频</div> },
        ],
    },

]