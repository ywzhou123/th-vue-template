import axios from '@/api/axios'
import { sms } from '@/api/prefix'

export default {
// 短信类型下拉列表
  fetchSmsType: data => axios.get(sms + '/smsTemplete/searchSmsType', data),

  // 工单类型下拉列表
  fetchSmsSheetType: data => axios.get(sms + '/smsTemplete/searchSheetType', data),

  // 发送对象类型下拉列表
  fetchSmsSendObj: data => axios.get(sms + '/smsTemplete/searchSendObj', data),

  // 短信列表
  fetchSmsList: data => axios.get(sms + '/sms/search', data),

  // 短信发送记录列表
  fetchSmsRecordList: data => axios.get(sms + '/sms/searchUserRelationBysql', data)
}
