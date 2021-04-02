/* eslint-disable no-undef */
// import Vue from 'vue'
import App from './views/Index.vue'
import globalUtil from '@/utils/global'
import '@/assets/css/index.scss'
import '@/assets/icon'

Vue.use(globalUtil)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
