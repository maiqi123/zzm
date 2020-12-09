// 使用 App.vue 作为根实例 根组件, 渲染视图
import Vue from 'vue'
import App from './App.vue'

// 使用App组件, 作为根组件, 创建结构, 渲染视图
// 需求: 实现登录页, 注册页, 首页 单页切换 vue-router
import router from './router'
import HmButton from './components/hm-button.vue'

Vue.component('hm-button', HmButton)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')



// new Vue({
//   el: '#app',
//   // 使用App组件, 作为根组件, 创建结构, 渲染视图
//   render: function(createElement) {
//     return createElement(App)
//   }
// })