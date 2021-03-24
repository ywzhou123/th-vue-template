import { getStore, setStore } from '@@/utils/store'
// import { getStore, setStore } from '@@/utils/store'
import { GetPsscUserInfoById, getUserInfo, loginBySocial } from '@/api/admin/login'
import { ActionContext } from 'vuex'

export interface State {
  userInfo: any
  psscUserInfo: any
  roles: Array<string>
  'access_token': string
}
interface LoginParams {
  state: string
  code: string
}
const user = {
  state: {
    userInfo: {
      username: 'username'
    },
    psscUserInfo: {},
    roles: [],
    access_token: getStore({
      name: 'access_token'
    }) || ''
  },
  actions: {
    // 根据OpenId登录
    LoginBySocial(context: ActionContext<State, any>, param: LoginParams) {
      return new Promise((resolve, reject) => {
        loginBySocial(param.state, param.code).then((response: any) => {
          const data = response.data
          context.commit('SET_ACCESS_TOKEN', data.access_token)
          resolve(null)
        }).catch((error: Error) => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    async GetUserInfo(context: ActionContext<State, any>) : Promise<any> {
      const res = await getUserInfo()
      const data = res.data.data || {}
      context.commit('SET_USER_INFO', data.sysUser)
      context.commit('SET_ROLES', data.roles || [])

      const res2 = await GetPsscUserInfoById(window.lt)
      const psscData = res2.data.data || {}
      context.commit('SET_PSSC_USER_INFO', psscData)
    },
    // 注销session
    FedLogOut(context: ActionContext<State, any>) : Promise<any> {
      return new Promise(resolve => {
        context.commit('SET_USER_INFO', {})
        context.commit('SET_ACCESS_TOKEN', '')
        context.commit('SET_ROLES', [])
        resolve(null)
      })
    }

  },
  mutations: {
    SET_ACCESS_TOKEN: (state: State, accessToken: string) : void => {
      state.access_token = accessToken
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session'
      })
    },
    SET_USER_INFO: (state: State, userInfo: any) : void => {
      state.userInfo = userInfo
    },
    SET_PSSC_USER_INFO: (state: State, psscUserInfo: any) : void => {
      state.psscUserInfo = psscUserInfo
    },
    SET_ROLES: (state: State, roles: Array<string>) : void => {
      state.roles = roles
    }
  }

}
export default user
