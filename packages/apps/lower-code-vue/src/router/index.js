import { createRouter, createWebHistory } from "vue-router";
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/edit/:page_id"
        },
        {
            path: "/edit/:page_id",
            name: "page_edit",
            component: () => import("../pages/editor.vue"),
            meta: {},
            // hidden: true
        }, {
            path: "/edit/preview/:page_id",
            name: "page_edit_preview",
            component: () => import("../pages/editor-view.vue"),
        }
    ]
});