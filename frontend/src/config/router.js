import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import PostsByCategory from '@/components/post/PostsByCategory'
import PostById from '@/components/post/PostById'
import Profile from '@/components/user/Profile'
import Auth from '@/components/auth/Auth'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'profile',
    path: '/profile',
    component: Profile,
},{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true}
},{
    name: 'postByCategory',
    path: '/categories/:id/posts',
    component: PostsByCategory
},{
    name: 'postById',
    path: '/categories/:id',
    component: PostById
},{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

 const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) =>{
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)){
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/'})
    }else{
        next()
    }
})
export default router