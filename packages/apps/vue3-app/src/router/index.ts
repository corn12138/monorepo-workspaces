import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;