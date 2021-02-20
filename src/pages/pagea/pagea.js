import Vue from 'vue'
import App from './pagea.vue'
import router from './router/router'
import store from './store'
import globalUtil from '@/utils/global'
import 'babel-polyfill'
import 'classlist-polyfill'
import 'normalize.css/normalize.css'
import '@/assets/css/index.scss'
import '@/assets/icon'
import './router/permission'

// 导入基础组件
import ThVueComponent from 'th-vue-component'
import 'th-vue-component/lib/theme/index.css'
import 'th-vue-component/lib/th-vue-component.css'
Vue.use(ThVueComponent)

// 导入业务组件
import ThVueBusiness from 'th-vue-business'
import 'th-vue-business/lib/th-vue-business.css'
Vue.use(ThVueBusiness)

// // 导入图表组件
// import ThVueEcharts from 'th-vue-echarts'
// import 'th-vue-echarts/lib/th-vue-echarts.css'
// Vue.use(ThVueEcharts)

// 开启mock服务
// process.env.NODE_ENV === 'development' && require('./mock/index.js')

Vue.use(globalUtil)

Vue.use(router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
