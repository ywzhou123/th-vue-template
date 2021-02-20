// import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store'
import globalUtil from './utils/global'
import './assets/icon'
import './router/permission'
import './assets/css/index.scss'

// 开启mock服务
process.env.NODE_ENV === 'development' && require('./mock/index.js')

window.Vue.use(globalUtil)

window.Vue.use(router)

window.Vue.config.productionTip = false

new window.Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
