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

// 导入基础组件
import ThVueComponent from 'th-vue-component'
import 'th-vue-component/lib/theme/index.css'
import 'th-vue-component/lib/th-vue-component.css'
Vue.use(ThVueComponent)

// // 导入业务组件
// import ThVueBusiness from 'th-vue-business'
// import 'th-vue-business/lib/th-vue-business.css'
// Vue.use(ThVueBusiness)

// // 导入图表组件
// import ThVueEcharts from 'th-vue-echarts'
// import 'th-vue-echarts/lib/th-vue-echarts.css'
// Vue.use(ThVueEcharts)

// 开启mock服务
// process.env.NODE_ENV === 'development' && require('./mock/index.js')

Vue.use(globalUtil)

Vue.use(router)

Vue.config.productionTip = false

let instance = null

function render(props = {}) {
  const { container } = props
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// webpack打包公共文件路径
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// 生命周期
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
