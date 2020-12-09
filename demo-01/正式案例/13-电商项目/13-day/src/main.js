import Vue from 'vue'
// 根组件
import App from './App.vue'
import router from './router'

// 引入全局样式
import './styles/base.less'

// 完整引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// axios 配置
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 请求拦截器
axios.interceptors.request.use(config => {
  // ,{
  //   headers : {
  //     Authorization : token
  //   }
  // }

  let token = localStorage.getItem('token')

  // if (token) {
  //   config.headers.Authorization = token
  // }
  token &&  (config.headers.Authorization = token)

  return config
})


// 过滤器
import moment from 'moment'
Vue.filter('date', res => {
  return moment(res).format('YYYY-MM-DD')
})

// ---------------------富文本编辑器的配置-----------------------
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
