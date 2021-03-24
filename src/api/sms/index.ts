import axios from '@/api/axios'
import { sms } from '@/api/prefix'

export default {
// 短信类型下拉列表
  fetchSmsType: (data:any) => axios.get(sms + '/smsTemplete/searchSmsType', data),

  // 工单类型下拉列表
  fetchSmsSheetType: (data:any) => axios.get(sms + '/smsTemplete/searchSheetType', data),

  // 发送对象类型下拉列表
  fetchSmsSendObj: (data:any) => axios.get(sms + '/smsTemplete/searchSendObj', data),

  // 短信列表
  fetchSmsList: (data:any) => axios.get(sms + '/sms/search', data),

  // 短信发送记录列表
  fetchSmsRecordList: (data:any) => axios.get(sms + '/sms/searchUserRelationBysql', data)
}
