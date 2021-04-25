import { createApp } from 'vue'
import App from './App'
import router, { history } from './router/router'
import store from './store'
import globalUtil from './utils/global'
import 'babel-polyfill'
import 'classlist-polyfill'
import 'normalize.css/normalize.css'
import './assets/icon'
import './router/permission'
import './assets/css/index.scss'

// https://github.com/element-plus/element-plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// 导入基础组件
// import ThVueComponent from 'th-vue-component'
// import 'th-vue-component/lib/theme/index.css'
// import 'th-vue-component/lib/th-vue-component.css'

// // 导入业务组件
// import ThVueBusiness from 'th-vue-business'
// import 'th-vue-business/lib/th-vue-business.css'

// // 导入图表组件
// import ThVueEcharts from 'th-vue-echarts'
// import 'th-vue-echarts/lib/th-vue-echarts.css'

// 开启mock服务
// process.env.NODE_ENV === 'development' && require('./mock/index.js')

let instance = null

function render(props = {}) {
  const { container } = props
  instance = createApp(App)
  globalUtil(instance)
  instance
    .use(ElementPlus)
    // .use(ThVueComponent)
    // .use(ThVueBusiness)
    // .use(ThVueEcharts)
    .use(router)
    .use(store)
    .mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

export async function bootstrap() {
  console.log('%c ', 'color: green;', 'vue3.0 app bootstraped')
}

export async function mount(props) {
  render(props)
}

export async function unmount() {
  instance.unmount()
  instance._container.innerHTML = ''
  instance = null
  history.destroy()
}
