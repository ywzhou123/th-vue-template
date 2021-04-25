import request from '@/api'

export default {
  install(Vue, options) {
    // 请求接口
    Vue.prototype.$request = request
  }
}
