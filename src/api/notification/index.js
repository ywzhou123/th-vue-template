import axios from '@/api/axios'
import { basic, waittask } from '@/api/prefix'

export default {
  // 获取系统参数
  fetchSystemParams: data => axios.get(basic + '/system/getSysParam'),
  // ISC登录
  // loginBySocial: data => axios.post('/auth/mobile/token/social', data),
  // 待办消息数量
  fetchWaitMsgCount: data => axios.get(waittask + '/waitTask/fetch-wait-msg-count', data),
  // 待办消息列表
  fetchWaitMsgList: data => axios.get(waittask + '/waitTask/fetch-wait-msg-list', data)
}
