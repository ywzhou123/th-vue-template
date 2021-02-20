import axios from '@/api/axios'
import { basic } from '@/api/prefix'

export default {
  // 登录
  loginBySocial: (state, code) => axios.post(
    '/auth/mobile/token/social',
    { mobile: state + '@' + code, grant_type: 'mobile' },
    {
      headers: {
        'TENANT-ID': '1',
        'Authorization': 'Basic cGlnOnBpZw=='
      }
    }
  ),
  // 用户信息
  getUserInfo: () => axios.get('/system/user/info'),
  // 用户信息
  GetPsscUserInfoById: async(userId) => await axios.get(basic + '/session/userinfo/' + userId)
}
