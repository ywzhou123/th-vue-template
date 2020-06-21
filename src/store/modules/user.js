import { getStore, setStore } from '@/utils/store'
import { isURL, validatenull } from '@/utils/validate'
import {
  loginBySSO,
  GetUserInfoById,
  GetPsscUserInfoById,
  GetUserInfoByName,
  getUserInfo,
  loginByMobile,
  loginBySocial,
  loginByUsername,
  logout,
  refreshToken
} from '@/api/admin/login'
import { deepClone, encryption } from '@/utils/util'
import webiste from '@/const/website'
import { GetMenu } from '@/api/admin/menu'

function addPath(ele, first) {
  const menu = webiste.menu
  const propsConfig = menu.props
  const propsDefault = {
    label: propsConfig.label || 'name',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children'
  }
  const icon = ele[propsDefault.icon]
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0
  if (!isChild) ele[propsDefault.children] = []
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children].forEach(child => {
      addPath(child)
    })
  }
}

const user = {
  state: {
    userInfo: {},
    psscUserInfo: {},
    permissions: {},
    roles: [],
    menu: getStore({
      name: 'menu'
    }) || [],
    menuAll: [],
    expires_in: getStore({
      name: 'expires_in'
    }) || '',
    access_token: getStore({
      name: 'access_token'
    }) || '',
    refresh_token: getStore({
      name: 'refresh_token'
    }) || ''
  },
  actions: {
    // 根据用户名登录
    LoginByUsername({ commit }, userInfo) {
      const user = encryption({
        data: userInfo,
        key: 'ThCloudXXThCloud',
        param: ['password']
      })
      return new Promise((resolve, reject) => {
        loginByUsername(user.username, user.password, user.code, user.randomStr).then(response => {
          const data = response.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          commit('SET_EXPIRES_IN', data.expires_in)
          commit('CLEAR_LOCK')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 根据用户名登录
    LoginBySso({ commit }, userId) {
      return new Promise((resolve, reject) => {
        loginBySSO(userId).then(response => {
          const data = response.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          commit('SET_EXPIRES_IN', data.expires_in)
          commit('CLEAR_LOCK')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 根据手机号登录
    LoginByPhone({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByMobile(userInfo.mobile, userInfo.code).then(response => {
          const data = response.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          commit('SET_EXPIRES_IN', data.expires_in)
          commit('CLEAR_LOCK')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据OpenId登录
    LoginBySocial({ commit }, param) {
      return new Promise((resolve, reject) => {
        loginBySocial(param.state, param.code).then(response => {
          const data = response.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          commit('SET_EXPIRES_IN', data.expires_in)
          commit('CLEAR_LOCK')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async GetUserInfo({ commit }) {

      const res = await getUserInfo()

      const data = res.data.data || {}
      commit('SET_USER_INFO', data.sysUser)
      commit('SET_ROLES', data.roles || [])
      commit('SET_PERMISSIONS', data.permissions || [])

      const res2 = await GetPsscUserInfoById(window.lt)
      const psscData = res2.data.data || {}
      commit('SET_PSSC_USER_INFO', psscData)

    },

    GetUserInfoById({ commit }, userId) {
      return new Promise((resolve, reject) => {
        GetUserInfoById(userId).then((res) => {
          const data = res.data.data || {}
          commit('SET_USER_INFO', data.sysUser)
          commit('SET_PSSC_USER_INFO', data)
          commit('SET_ROLES', data.roles || [])
          commit('SET_PERMISSIONS', data.permissions || [])
          resolve(data)
        }).catch(() => {
          reject()
        })
      })
    },

    GetPsscUserInfoById({ commit }, userId) {
      return new Promise((resolve, reject) => {
        GetUserInfoById(userId).then((res) => {
          const data = res.data.data || {}
          console.log(data)
          commit('SET_PSSC_USER_INFO', data)
          resolve(data)
        }).catch(() => {
          reject()
        })
      })
    },


    GetUserInfoByName({ commit }, userName) {
      return new Promise((resolve, reject) => {
        GetUserInfoByName(userName).then((res) => {
          const data = res.data.data || {}
          commit('SET_USER_INFO', data.sysUser)
          commit('SET_PSSC_USER_INFO', data.sysUser)
          commit('SET_ROLES', data.roles || [])
          commit('SET_PERMISSIONS', data.permissions || [])
          resolve(data)
        }).catch(() => {
          reject()
        })
      })
    },


    // 刷新token
    RefreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        refreshToken(state.refresh_token).then(response => {
          const data = response.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          commit('SET_EXPIRES_IN', data.expires_in)
          commit('CLEAR_LOCK')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_MENU', [])
          commit('SET_PERMISSIONS', [])
          commit('SET_USER_INFO', {})
          commit('SET_ACCESS_TOKEN', '')
          commit('SET_REFRESH_TOKEN', '')
          commit('SET_EXPIRES_IN', '')
          commit('SET_ROLES', [])
          commit('DEL_ALL_TAG')
          commit('CLEAR_LOCK')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 注销session
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_MENU', [])
        commit('SET_PERMISSIONS', [])
        commit('SET_USER_INFO', {})
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_ROLES', [])
        commit('DEL_ALL_TAG')
        commit('CLEAR_LOCK')
        resolve()
      })
    },
    // 获取系统菜单
    GetMenu({ commit }) {
      return new Promise(resolve => {
        GetMenu().then((res) => {
          const data = res.data.data
          const menu = deepClone(data)
          menu.forEach(ele => {
            addPath(ele)
          })
          commit('SET_MENU', menu)
          resolve(menu)
        })
      })
    }

  },
  mutations: {
    SET_ACCESS_TOKEN: (state, access_token) => {
      state.access_token = access_token
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session'
      })
    },
    SET_EXPIRES_IN: (state, expires_in) => {
      state.expires_in = expires_in
      setStore({
        name: 'expires_in',
        content: state.expires_in,
        type: 'session'
      })
    },
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
      setStore({
        name: 'refresh_token',
        content: state.refresh_token,
        type: 'session'
      })
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_PSSC_USER_INFO: (state, psscUserInfo) => {
      state.psscUserInfo = psscUserInfo
    },

    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({
        name: 'menu',
        content: state.menu,
        type: 'session'
      })
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      const list = {}
      for (let i = 0; i < permissions.length; i++) {
        list[permissions[i]] = true
      }
      state.permissions = list
    }
  }

}
export default user
