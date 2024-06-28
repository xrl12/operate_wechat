import {
    createRouter,
    createWebHashHistory,
    Router,
    RouteRecordRaw,
    RouterOptions
} from "vue-router";


export const constantRoutes: Array<RouteRecordRaw> = [
    {
        name: 'login',
        path: '/login',
        component: () => import("@/views/login/index.vue"),
        meta: {"title": "登陆"}
    },
    {
        name: "dashboard",
        path: "/",
        component: () => import("@/components/layout/index.vue"),
        children: [],
        meta: {}

    }
]


const router: Router = createRouter(<RouterOptions>{
    history: createWebHashHistory(),
    routes: constantRoutes
})


export default router
