import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

// 注意修改微应用前缀'/template'，与微框架的apps中定义的activeRule保持一致
export const createRouter = routes => new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/template' : process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})

const router = createRouter(routes)
export default router
