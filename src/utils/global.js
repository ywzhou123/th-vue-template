import request from '@/api'
import enums from '@/const/enums/index'

export default app => {
  // 静态资源目录前缀
  app.config.globalProperties.$path = '.'
  // 请求接口
  app.config.globalProperties.$request = request
  // 枚举
  app.config.globalProperties.$enums = enums
}
