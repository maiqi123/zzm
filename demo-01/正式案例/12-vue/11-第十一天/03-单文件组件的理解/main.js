// 之前定义组件
// import Jack from './Jack.js'
// Vue.component('jack', Jack)

// .vue文件, 将来webpack是需要处理的!
// 注册全局组件: 在任何vue实例中都可以使用  <Jack></Jack>
import Jack from './Jack.vue'
Vue.component('jack', Jack)



