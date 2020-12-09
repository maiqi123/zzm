import Vue from 'vue'
// 根组件
import App from './App.vue'
// 路由
import router from './router'

Vue.config.productionTip = false

// 引入全局样式文件
import './styles/base.less'
import './styles/iconfont.css'

// 引入 lib-flexible
import 'lib-flexible'

// 注册公共组件
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmButton from './components/HmButton.vue'
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
