/**
 * 全站权限配置
 */
import router from './router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (window.GLOBAL_IS_ORIGIN) {
    next()
  } else {
    const meta = to.meta || {}
    if (store.getters.access_token) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (store.getters.roles.length === 0) {
          store.dispatch('GetUserInfo').then(() => {
            next()
          }).catch(() => {
            store.dispatch('FedLogOut').then(() => {
              next({ path: '/login' })
            })
          })
        }
        next()
      }
    } else {
      if (window.lt !== '') {
        store.dispatch('LoginBySocial', {
          state: 'ISC',
          code: window.lt
        }).then(
          () => {
            store.dispatch('GetUserInfo').then(() => {
              next()
            }).catch(() => {
              store.dispatch('FedLogOut').then(() => {
                next({ path: '/login' })
              })
            })

          })
      } else {
        if (meta.isAuth === false) {
          next()
        } else {
          next('/login')
        }
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
