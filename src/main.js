import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store'
import globalUtil from './utils/global'
import 'babel-polyfill'
import 'classlist-polyfill'
import 'normalize.css/normalize.css'
import './assets/icon'
import './router/permission'
import './assets/css/index.scss'

/**
 * 导入 th-pdiot-component-ui
 */
import ElementUI from 'th-pdiot-component-ui'
import 'th-pdiot-component-ui/lib/theme/index.css'
import 'th-pdiot-component-ui/lib/th-pdiot-component-ui.css'

// 开启mock服务
// process.env.NODE_ENV === 'development' && require('./mock/index.js')

Vue.use(globalUtil)

Vue.use(router)

Vue.use(ElementUI, {
  size: 'mini',
  menuType: 'text'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
