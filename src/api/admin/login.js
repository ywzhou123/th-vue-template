import axios from '@/api/axios'
import { basic } from '@/api/prefix'

export default {
  // 第三方登录
  loginBySocial: (state, code) => {
    const params = { mobile: state + '@' + code, grant_type: 'mobile' }
    return axios.post('/auth/mobile/token/social', params, {
      headers: {
        'TENANT-ID': '1',
        'Authorization': 'Basic cGlnOnBpZw=='
      }
    })
  },
  // 用户信息
  getUserInfo: () => axios.get('/system/user/info'),
  // 供服用户信息
  GetPsscUserInfoById: async userId => await axios.get(basic + '/session/userinfo/' + userId)
}
