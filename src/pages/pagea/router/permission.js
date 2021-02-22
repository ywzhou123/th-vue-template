/**
 * 全站权限配置
 */
import router from './router'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

window.NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  window.NProgress.start()
  next()
})

router.afterEach(() => {
  window.NProgress.done()
})
