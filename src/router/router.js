import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

// 注意修改微应用前缀'/template'，与微框架的apps中定义的activeRule保持一致
export const history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue3' : '/')

const router = createRouter({
  history,
  routes
})

export default router
