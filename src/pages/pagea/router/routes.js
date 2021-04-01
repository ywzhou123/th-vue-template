export default [
  {
    path: '/',
    redirect: '/pagea-subone'
  },
  /** 路由配置 begin */
  {
    path: '/pagea-subone',
    name: '子页面一',
    component: () =>
      import(/* webpackChunkName: "pagea-subone" */ '../views/SubOne/Index.vue'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/pagea-subtwo',
    name: '子页面二',
    component: () =>
      import(/* webpackChunkName: "pagea-subtwo" */ '../views/SubTwo/Index.vue'),
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
