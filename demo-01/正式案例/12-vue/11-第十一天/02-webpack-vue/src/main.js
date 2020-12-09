// 1. 拷贝了 package.json, config
// 2. 新建了 public/index.html  dist  src/main.js
// 3. yarn 安装依赖包
// 4. yarn dev 启动
// console.log('这是main.js')

// 需求: 使用 App.vue 作为根组件(根实例) 渲染 index.html
import Vue from 'vue'
import App from './App.vue'
import HmHeader from './components/hm-header.vue'
import HmMain from './components/hm-main.vue'
import HmFooter from './components/hm-footer.vue'

// 组件全局注册
// <HmHeader></HmHeader>  <hm-header></hm-header>
Vue.component('hm-header', HmHeader)
Vue.component('HmMain', HmMain)
Vue.component('HmFooter', HmFooter)


// 使用App作为根组件渲染视图
const vm = new Vue({
  // 指定视图
  el: '#app',
  // vue底层的语法: render
  render (createElement) {
    return createElement(App)
  }
})

