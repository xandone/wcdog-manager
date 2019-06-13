import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import userList from './page/userList.vue'
import manager from './page/manager.vue'
import jokeList from './page/jokeList.vue'
import jokeAdd from './page/jokeAdd.vue'
import banner from './page/banner.vue'
import imgList from './page/imgList.vue'
import login from './page/login.vue'
import adminList from './page/adminList.vue'
import admin from './page/admin.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            name: 'login',
            component: login
        }, {
            path: '/',
            name: 'home',
            component: Home,
            children: [{
                path: '/manager',
                name: 'manager',
                component: manager,
                meta: []
            }, {
                path: '/userList',
                name: 'userList',
                component: userList,
                meta: ['用户管理', '用户列表'],
            }, {
                path: '/jokeList',
                name: 'jokeList',
                component: jokeList,
                meta: ['段子管理', '段子列表'],
            }, {
                path: '/jokeAdd',
                name: 'jokeAdd',
                component: jokeAdd,
                meta: ['段子管理', '新增段子'],
            }, {
                path: '/banner',
                name: 'banner',
                component: banner,
                meta: ['图片管理', '首页轮播'],
            }, {
                path: '/imgList',
                name: 'imgList',
                component: imgList,
                meta: ['图片管理', '图片列表'],
            }, {
                path: '/adminList',
                name: 'adminList',
                component: adminList,
                meta: ['管理员', '人员列表'],
            }, {
                path: '/admin',
                name: 'admin',
                component: admin,
                meta: ['管理员', '管理员'],
            }]
        },

        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})