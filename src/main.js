/* eslint-disable no-undef */
import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store'
import globalUtil from './utils/global'
import './router/permission'
import './assets/css/index.scss'
// 导入基础组件
import ThVueComponent from 'th-vue-component'
import 'th-vue-component/lib/theme/index.css'
Vue.use(ThVueComponent)
// 开启mock服务
process.env.NODE_ENV === 'development' && require('./mock/index.js')

// 微前端主应用配置
import { registerMicroApps, setDefaultMountApp, start } from 'qiankun'

Vue.use(globalUtil)
Vue.use(router)
Vue.config.productionTip = false

let app = null

/**
 * 渲染
 * @param {*} appContent 子应用html内容
 * @param {*} loading 子应用加载状态
 */
const render = ({ appContent, loading } = {}) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      data: { apps },
      render: h => h(App)
    }).$mount('#app')
  } else {
    app.content = appContent
    app.loading = loading
  }
}
/**
 * 主应用初始化
 */
render({ appContent: '', loading: true })
/**
 * 注册子应用
 */

registerMicroApps(apps,
  {
    // 挂载前
    beforeLoad: [
      app => console.log('before load', app)
    ],
    // 挂载后
    beforeMount: [
      app => console.log('before mount', app)
    ],
    // 卸载后
    afterUnmount: [
      app => console.log('after unload', app)
    ]
  }
)
/**
 * 设置默认子应用
 */
setDefaultMountApp(apps[0].name)
/**
 * 启动
 */
start()
