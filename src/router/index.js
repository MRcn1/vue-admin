import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component(resolve) {
                require(['../page/login/login'], resolve)
            },
            meta: {
                title: '登录'
            },
        },
        {
            path: '/layout',
            name: 'layout',
            component(resolve) {
                require(['../page/layout/layout'], resolve)
            },
            meta: {
                title: '主页',
                keepAlive:true,
            },
            children:[
                {
                    path:'',
                    redirect:'home'
                },
                {
                    path: 'home',
                    name: 'home',
                    component(resolve) {
                        require(['../page/home'], resolve)
                    },
                    meta: {
                        title: '首页',
                        keepAlive:true,
                    }, 
                },
                {
                    path: 'userList',
                    name: 'userList',
                    component(resolve) {
                        require(['../page/userList'], resolve)
                    },
                    meta: {
                        title: '用户列表',
                        att:'数据管理',
                        keepAlive:true,
                    }, 
                },
                {
                    path: 'shopList',
                    name: 'shopList',
                    component(resolve) {
                        require(['../page/shopList'], resolve)
                    },
                    meta: {
                        title: '商家列表',
                        att:'数据管理',
                        keepAlive:true,
                    }, 
                },
                {
                    path: 'foodList',
                    name: 'foodList',
                    component(resolve) {
                        require(['../page/foodList'], resolve)
                    },
                    meta: {
                        title: '食品列表',
                        att:'数据管理'
                    }, 
                },
                {
                    path: 'orderList',
                    name: 'orderList',
                    component(resolve) {
                        require(['../page/orderList'], resolve)
                    },
                    meta: {
                        title: '订单列表',
                        att:'数据管理'
                    }, 
                },
                {
                    path: 'adminList',
                    name: 'adminList',
                    component(resolve) {
                        require(['../page/adminList'], resolve)
                    },
                    meta: {
                        title: '管理员列表',
                        att:'数据管理'
                    }, 
                },
                {
                    path: 'addshow',
                    name: 'addshow',
                    component(resolve) {
                        require(['../page/addshow'], resolve)
                    },
                    meta: {
                        title: '添加商品',
                        att:'添加数据'
                    }, 
                },
            ]
        },
    ]
})

export default router