/* eslint-disable no-undef */
// import Vue from 'vue'
import App from './pagec.vue'
import router from './router/router'
import store from './store'
import globalUtil from '@/utils/global'
import '@/assets/css/index.scss'
import '@/assets/icon'
import './router/permission'

// 开启mock服务
process.env.NODE_ENV === 'development' && require('@/mock/index.js')

Vue.use(globalUtil)

Vue.use(router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
