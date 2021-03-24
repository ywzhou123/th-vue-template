import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import routes from './routes'

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location:any):any {
//   return originalPush.call(this, location).catch((err:Error) => err)
// }
Vue.use(VueRouter)

export const createRouter = (routes: Array<RouteConfig>) => new VueRouter({
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
