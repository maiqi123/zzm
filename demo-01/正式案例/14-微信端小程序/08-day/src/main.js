import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 挂在到原型上
// 安装插件
import plugin from './utils/request'
Vue.use(plugin)

// 引入字体图标
import './static/iconfont.css'
import './uni.less'

// 全局注册
import ugoSearch from './components/ugo-search.vue'
import ugoTab from './components/ugo-tab.vue'
import ugoGoods from './components/ugo-goods.vue'
Vue.component('ugo-goods',ugoGoods)
Vue.component('ugo-tab',ugoTab)
Vue.component('ugo-search',ugoSearch)

// 过滤器
import moment from 'moment'
Vue.filter('date', res => {
  return moment(res).format('YYYY-MM-DD hh:mm')
})

const app = new Vue({
  ...App
})
app.$mount()
