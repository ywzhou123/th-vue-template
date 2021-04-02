export default [
  {
    path: '/',
    redirect: '/pagec-subone'
  },
  /** 路由配置 begin */
  {
    path: '/pagec-subone',
    name: '页面C',
    component: () =>
      import(/* webpackChunkName: "pagec-subone" */ '../views/SubOne/Index'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  /** 路由配置 end */
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
  },
  {
    path: '*',
    redirect: '/404'
  }
]
