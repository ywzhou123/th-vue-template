import axios from '@/api/axios'
import { basic } from '@/api/prefix'
const request = axios.request

export const loginBySocial = (state, code) => {
  const grant_type = 'mobile'
  return request({
    url: '/auth/mobile/token/social',
    headers: {
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { mobile: state + '@' + code, grant_type }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/system/user/info',
    method: 'get'
  })
}

export const GetPsscUserInfoById = async(userId) => {
  return await request({
    url: basic + '/session/userinfo/' + userId,
    method: 'get'
  })
}
