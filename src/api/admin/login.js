import axios from '@/api/axios'
import { basic } from '@/api/prefix'
const request = axios.request

const scope = 'server'

export const loginByUsername = (username, password, code, randomStr) => {
  const grant_type = 'password'

  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { username, password, randomStr, code, grant_type, scope }
  })
}

export const loginBySSO = () => {

  const client_id = 'test'
  const client_secret = 'test'
  const grant_type = 'client_credentials'

  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic dGVzdDp0ZXN0'
    },
    method: 'post',
    params: { client_id, client_secret, grant_type }
  })
}

export const refreshToken = (refresh_token) => {
  const grant_type = 'refresh_token'
  return request({
    url: '/auth/oauth/token',
    headers: {
      'isToken': false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { refresh_token, grant_type, scope }
  })
}

export const loginByMobile = (mobile, code) => {
  const grant_type = 'mobile'
  return request({
    url: '/auth/mobile/token/sms',
    headers: {
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { mobile: 'SMS@' + mobile, code: code, grant_type }
  })
}

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

export const GetUserInfoById = (userId) => {
  return request({
    url: '/system/user/info2',
    method: 'get',
    params: { userId }
  })
}

export const GetPsscUserInfoById = async(userId) => {
  return await request({
    url: basic + '/session/userinfo/' + userId,
    method: 'get'
  })
}

export const GetUserInfoByName = (userName) => {
  return request({
    url: '/system/user/info/' + userName,
    method: 'get'
  })
}

export const logout = () => {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}
