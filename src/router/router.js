// import Vue from 'vue'
// import VueRouter from 'vue-router'
import routes from './routes'

const originalPush = window.VueRouter.prototype.push
window.VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
window.Vue.use(window.VueRouter)

export const createRouter = routes => new window.VueRouter({
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
