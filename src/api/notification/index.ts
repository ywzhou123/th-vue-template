import axios from '@/api/axios'
import { basic, waittask } from '@/api/prefix'

export default {
  // 获取系统参数
  fetchSystemParams: (data:any) => axios.get(basic + '/system/getSysParam', data),
  // ISC登录
  // loginBySocial: (data:any) => axios.post('/auth/mobile/token/social', data),
  // 待办消息数量
  fetchWaitMsgCount: (data:any) => axios.get(waittask + '/waitTask/fetch-wait-msg-count', data),
  // 待办消息列表
  fetchWaitMsgList: (data:any) => axios.get(waittask + '/waitTask/fetch-wait-msg-list', data)
}
