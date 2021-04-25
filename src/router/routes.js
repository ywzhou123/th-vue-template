export default [
  {
    path: '/'
  },
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "error" */ '@/components/error/403'),
    name: '403'
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "error" */ '@/components/error/404'),
    name: '404'
  },
  {
    path: '/500',
    component: () => import(/* webpackChunkName: "error" */ '@/components/error/500'),
    name: '500'
  }
]
