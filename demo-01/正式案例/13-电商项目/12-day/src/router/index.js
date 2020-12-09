
import Vue from 'vue'
import VueRouter from 'vue-router'

// 项目中 use
Vue.use(VueRouter)

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import List from '../views/List.vue'
import Publish from '../views/Publish.vue'

// 创建 路由实例
const router = new VueRouter({
  routes:[
    { path : '/', redirect :'/home' },
    { path :'/login',component: Login },
    { path :'/home',component: Home , children : [
       { path :'list',component: List },
       { path :'publish',component: Publish },
    ] },

  ]
})

// 导出
export default router