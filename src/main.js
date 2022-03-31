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

// 引入全局样式
import './style/global.css'
// 引入图标字体
import "./assets/iconfont/iconfont.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
