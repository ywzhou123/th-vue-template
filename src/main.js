import { createApp } from 'vue'
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

const app = createApp(App)
globalUtil(app)

app
  .use(ElementPlus)
  // .use(ThVueComponent)
  // .use(ThVueBusiness)
  // .use(ThVueEcharts)
  .use(store)
  .use(router)
  .mount('#app')
