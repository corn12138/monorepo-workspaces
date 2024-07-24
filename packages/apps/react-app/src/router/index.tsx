import React from "react";
import { Outlet, RouteObject, Router } from "react-router-dom";
import Home from "../pages/home";
import RecommendList from "../pages/home/tabs/recommendList";
import Education from "../pages/education";
import FindPage from "../pages/findPage/index";


export interface ExtraBizObject {
    title?: string;
}

export type ZHRouter = RouteObject & ExtraBizObject;

export const router: Array<ZHRouter> = [
    {
        path: '/', element: <Home />, title: "首页",
        children: [
            { path: "", element: <RecommendList /> },
            { path: "follow", element: <div>关注</div> },
            { path: "hot", element: <div>热榜</div> },
            { path: "zvideo", element: <div>视频</div> },
        ]
    },
    {
        path: "/education", element: <Education />, title: "知乎知学堂"
    },
    {
        path: "/explore", element: <FindPage />, title: "发现"
    },
    {
        path: "/question", element: <div>等你来答</div>, title: "等你来答"
    }

]