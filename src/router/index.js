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
            path: '/blogAdmin',
            redirect: '/publish',
            component: blogAdmin,
            children: [
                {
                    path: '/publish',
                    component: publish,
                },
                {
                    path: '/manage',
                    component: manage,
                },
            ]
        },
    ]
})

export default router;