import Vue from "vue"
import VueRouter from "vue-router"

const index = () => import('../page/index')
const login = () => import('../page/login')
const home = () => import('../page/home')
const archives = () => import('../page/archives')
const detail = () => import('../page/detail')
const categories = () => import('../page/categories')
const tags = () => import('../page/tags')
const about = () => import('../page/about')
const blogAdmin = () => import('../page/blogAdmin')
const publish = () => import('../page/publish')
const manage = () => import('../page/manage')


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: index,
            children: [
                {
                    path: '',
                    component: home,
                },
                {
                    path: '/archives',
                    component: archives,
                },
                {
                    path: '/detail',
                    component: detail,
                },
                {
                    path: '/categories',
                    component: categories,
                },
                {
                    path: '/tags',
                    component: tags,
                },
                {
                    path: '/about',
                    component: about,
                },
            ]
        },
        {
            path: '/admin',
            component: login,
        },
        {
            // 用户id作为路径参数
            path: '/blogAdmin/:id',
            component: blogAdmin,
            children: [
                {
                    path: 'publish',
                    component: publish,
                    meta: 'needAuth'
                },
                {
                    path: 'manage',
                    component: manage,
                    meta: 'needAuth'
                },
            ]
        },
    ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta === 'needAuth' && !window.sessionStorage.getItem('token')) {
        return next('/admin')
    } else {
        return next()
    }
})

export default router;