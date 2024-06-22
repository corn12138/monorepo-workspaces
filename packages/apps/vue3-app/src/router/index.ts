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
            }
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