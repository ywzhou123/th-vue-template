// import Vue from 'vue'
import App from './pagea.vue'
import router from './router/router'
import store from './store'
import globalUtil from '@/utils/global'
import '@/assets/css/index.scss'
import '@/assets/icon'
import './router/permission'

// 开启mock服务
process.env.NODE_ENV === 'development' && require('@/mock/index.js')

window.Vue.use(globalUtil)

window.Vue.use(router)

window.Vue.config.productionTip = false

new window.Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
