import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 导入markdown插件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 按需导入element-ui组件
import element from './element'
Vue.use(element)

// 导入axios
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8082/'

// 设置axios请求拦截器，当session中存在token时，每次请求在请求头中加上token
axios.interceptors.request.use(config => {
  let token = window.sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 全局挂载axios
Vue.prototype.$http = axios

import dayjs from 'dayjs'
// 注册全局时间格式化过滤器
Vue.filter('dateFormat', function(originTime, format='YYYY年MM月DD日 HH:mm:ss'){
  return dayjs(originTime).format(format);
})

// 引入全局样式
import './style/global.css'
// 引入图标字体
import "./assets/iconfont/iconfont.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
