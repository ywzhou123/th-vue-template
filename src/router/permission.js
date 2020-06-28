/**
 * 全站权限配置
 */
import router from './router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { validatenull } from '@@/utils/validate'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (window.GLOBAL_IS_ORIGIN) {
    next()
  } else {
    const meta = to.meta || {}
    if (store.getters.access_token) {
      const lockPage = store.getters.website.lockPage
      if (store.getters.isLock && to.path !== lockPage) {
        next({ path: lockPage })
      } else if (to.path === '/login') {
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

          // store.dispatch('GetUserInfoByName', lt).then(() => {
          //   next({ path: '/' })
          // }).catch(() => {
          //   store.dispatch('FedLogOut').then(() => {
          //     next({ path: '/login' })
          //   })
          // })

        } else {
          const value = to.query.src || to.fullPath
          const label = to.query.name || to.name
          if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
            store.commit('ADD_TAG', {
              label: label,
              value: value,
              params: to.params,
              query: to.query,
              group: router.$avueRouter.group || []
            })
          }
          next()
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
