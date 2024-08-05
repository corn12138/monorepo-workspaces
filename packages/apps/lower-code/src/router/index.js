import { createRouter,createWebHashHistory } from "vue-router";
export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/edit/:pageId",
            name: "page_edit",
            component: () => import("@/page/editor.vue")
        }
    ]
});