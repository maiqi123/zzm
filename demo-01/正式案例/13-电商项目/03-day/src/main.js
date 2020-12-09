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
import { Field, Toast,Cell, CellGroup,Dialog } from 'vant'


Vue.use(Dialog);   // install
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Toast)
Vue.use(Field)

// 注册一个全局过滤器
import moment from 'moment'
Vue.filter('date',function (val,format='YYYY-MM-DD') {
  return  moment(val).format(format)
})


 


// 请求拦截器
// 拦截所有的axios的请求 
// axios.get(url,config)
axios.interceptors.request.use(config => {

  let token =  localStorage.getItem('token')

  if (token) {
    
    config.headers.Authorization = token
  }

  return config

})

// ,{
//   headers : {
//     Authorization : token
//   }
// }

// 响应拦截器
// axios.interceptors.response.use()

new Vue({
  router,   //this.$router
  render: h => h(App),
}).$mount('#app')
