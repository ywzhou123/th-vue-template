export default [
  {
    path: '/',
    redirect: '/pagea'
  },
  /** 路由配置 begin */
  {
    path: '/pagea',
    name: '页面A',
    component: () => import(/* webpackChunkName: "pagea" */ '@/views/PageA/Index.vue'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  /** 路由配置 end */
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "error" */ '@/components/error/403.vue'),
    name: '403'
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "error" */ '@/components/error/404.vue'),
    name: '404'
  },
  {
    path: '/500',
    component: () => import(/* webpackChunkName: "error" */ '@/components/error/500.vue'),
    name: '500'
  },
  {
    path: '*',
    redirect: '/404'
  }
]
