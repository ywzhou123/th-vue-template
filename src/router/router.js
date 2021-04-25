import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

export const createRouter = routes => new VueRouter({
  base: '/',
  mode: 'history',
  routes
})

const router = createRouter(routes)
export default router
