// 引入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入页面组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

// 细节 : 项目中(模块化工程中) 必须要使用 Vue.use()安装一下, 把 路由当成插件来使用
Vue.use(VueRouter)

// 实例化路由
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
  ],
})

// 导出
export default router
