/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store'
import globalUtil from './utils/global'
// import 'babel-polyfill'
// import 'classlist-polyfill'
// import 'normalize.css/normalize.css'
// import './assets/icon'
// import './router/permission'
import './assets/css/index.scss'

// 导入基础组件
// import ThVueComponent from 'th-vue-component'
// import 'th-vue-component/lib/theme/index.css'
// import 'th-vue-component/lib/th-vue-component.css'
// Vue.use(ThVueComponent)
// import ThLink from 'th-vue-component/packages/link/index'
// Vue.use(ThLink)
// import ElementUI from 'element-ui'
// Vue.use(ElementUI)
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


// 微前端主应用配置
import { registerMicroApps, setDefaultMountApp, start } from 'qiankun'
let app = null

Vue.use(globalUtil)
Vue.use(router)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
/**
 * 渲染
 * @param {*} appContent 子应用html内容
 * @param {*} loading 子应用加载状态
 */
const render = ({ appContent, loading } = {}) => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      data() {
        return {
          content: appContent,
          loading
        }
      },
      render: h => h(App, {
        props: {
          content: this.content,
          loading: this.loading
        }
      })
    })
  } else {
    app.content = appContent
    app.loading = loading
  }
}
/**
 * 路由监听
 * @param {*} routerPrefix 路由前缀
 */
const getActiveRule = (routerPrefix) => {
  return location => location.pathname.startsWith(routerPrefix)
}
/**
 * 主应用初始化
 */
// const initApp = () => {
//   render({ appContent: '', loading: true })
// }
// initApp()
/**
 * 注册子应用
 */
registerMicroApps(
  [
    {
      name: 'cloud-desktop app',
      entry: '//localhost:8082',
      container: '#yourContainer',
      // render,
      activeRule: '/yourActiveRule'
    },
    {
      name: 'th-vue-component app',
      entry: { scripts: ['//localhost:8081/main.js'] },
      container: '#yourContainer2',
      // render,
      activeRule: '/yourActiveRule2'
    }
  ],
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
setDefaultMountApp('/yourActiveRule2')
/**
 * 启动
 */
start()
