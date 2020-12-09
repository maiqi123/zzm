// 引入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入页面组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'


// 细节 : 项目中(模块化工程中) 必须要使用 Vue.use()安装一下, 把 路由当成插件来使用
Vue.use(VueRouter)  // 触发 install 启动 路由 里面的其他功能

// 实例化路由
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name :'login',
      component: Login,
    },
    {
      path: '/register',
      name : 'register',
      component: Register,
    },
    {
      path: '/user',
      name : 'user',
      component: User,
    },
  ],
})

// 全局前置守卫
// 1. to :   你要去哪里    305  路由对象
// 2. from  : 你从 哪里来  301  路由对象 
// 3. next 是否允许进入
//   next() 允许进入
//   next(false) 不允许进入
//   next('/login') 允许进入login
router.beforeEach((to,from,next) => {

  if (to.path === '/user') {  // 未完待续
      
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }else {  // 放行
    next()
  }
})

// 导出
export default router
