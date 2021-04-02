import { getStore, setStore } from '@@/utils/store'
import { GetPsscUserInfoById, getUserInfo, loginBySocial } from '@/api/admin/login'

const user = {
  state: {
    userInfo: {},
    psscUserInfo: {},
    roles: [],
    access_token: getStore({
      name: 'access_token'
    }) || ''
  },
  actions: {
    // 根据OpenId登录
    LoginBySocial({ commit }, param) {
      return new Promise((resolve, reject) => {
        loginBySocial(param.state, param.code).then(response => {
          const data = response.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    async GetUserInfo({ commit }) {
      const res = await getUserInfo()
      const data = res.data.data || {}
      commit('SET_USER_INFO', data.sysUser)
      commit('SET_ROLES', data.roles || [])

      const res2 = await GetPsscUserInfoById(window.lt)
      const psscData = res2.data.data || {}
      commit('SET_PSSC_USER_INFO', psscData)

    },
    // 注销session
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USER_INFO', {})
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_ROLES', [])
        resolve()
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
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_PSSC_USER_INFO: (state, psscUserInfo) => {
      state.psscUserInfo = psscUserInfo
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  }

}
export default user
