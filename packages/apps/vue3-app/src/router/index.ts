import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/components/Homes.vue"),
        children: [
            {
                path: '/frontPage',
                name: 'frontPage',
                component: () => import("@/pages/home/index.vue")
            },
            {
                path: '/translation',
                name: 'translation',
                component: () => import("@/pages/translation/index.vue")
            },
            {
                path: '/archive',
                name: 'archive',
                component: () => import("@/pages/archive/index.vue")
            },
            {
                path: '/testPage',
                name: 'testPage',
                component: () => import("@/pages/testPage/index.vue")
            },
            // {
            //     path:"/modalPage",
            //     name:"modalPage",
            //     component:()=>import("@/pages/modal/index.vue"),
            //     meta:{
            //         title:"模态框"
            //     }
            // }

        ]
    },
    {
        path:'/login',
        name: 'Login',
        component: () => import("@/pages/login/index.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    // history:createWebHashHistory(),
    routes
});

export default router;