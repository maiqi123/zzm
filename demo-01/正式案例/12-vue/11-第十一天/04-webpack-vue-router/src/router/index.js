// components中的组件, 是通用的组件, 可以全局注册, 也可以局部注册
// 例如: hm-button  hm-header  hm-input, 使用时注册, <hm-button></hm-button>

// views(pages)中的组件, 是页面性质的组件, 是用于跳转切换的, 需要配合路由使用
// 例如: Home.vue 首页 Register.vue注册页 Login.vue登录页

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

// 模块化环境中, 使用vue插件 (vue-router), 都需要 Vue.use 一下
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
  ]
})

export default router
