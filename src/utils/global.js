import request from '@/api'
import enums from '@/const/enums/index'

export default {
  install (Vue, options) {
    // 静态资源目录前缀
    Vue.prototype.$path = '.'
    // 请求接口
    Vue.prototype.$request = request
    // 枚举
    Vue.prototype.$enums = enums
  }
}
