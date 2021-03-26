import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  // history: createWebHistory(), // history模式
  history: createWebHashHistory(), // hash模式
  routes
})

export default router
