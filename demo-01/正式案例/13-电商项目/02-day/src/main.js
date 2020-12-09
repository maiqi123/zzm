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

// 方式三 : 全部 引入
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)

// 方式一 : 按需加载
import { Field, Toast } from 'vant'

Vue.use(Toast)
Vue.use(Field)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
