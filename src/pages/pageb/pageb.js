// import Vue from 'vue'
import App from './views/Index.vue'
import globalUtil from '@/utils/global'
import '@/assets/css/index.scss'
import '@/assets/icon'

window.Vue.use(globalUtil)

window.Vue.config.productionTip = false

new window.Vue({
  render: h => h(App)
}).$mount('#app')
