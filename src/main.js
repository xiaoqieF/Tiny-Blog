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
// 引入动画样式
import 'animate.css';
// 引入github-markdown样式
import 'github-markdown-css/github-markdown.css'

// 数学公式katex支持
import katex from 'katex'
import 'katex/dist/katex.css'
import renderMathInElement from 'katex/contrib/auto-render/auto-render'

// 定义自动渲染的配置参数,这些参数根据你的需求进行修改，下面的参数是官网上抄下来的
const renderOption = {
  delimiters: [
    {left: '$$', right: '$$', display: true},
    {left: '$', right: '$', display: false},
    {left: '\\(', right: '\\)', display: false},
    {left: '\\[', right: '\\]', display: true}
  ],
  throwOnError : false
}

// 挂载自动渲染函数到vue原型
Vue.prototype.$formula = function (dom) {
  renderMathInElement(dom, renderOption)
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线
	},
}).$mount('#app')
