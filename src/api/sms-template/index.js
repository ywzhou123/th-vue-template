import axios from '@/api/axios'
import { basic } from '@/api/prefix'

export default {
  // 短信模板列表
  // sheetType: 01
  // sheetTypeSub:
  // sendObj: 03
  // smsType: 2
  // orgNo: 36401
  // pageIndex: 1
  // pageSize: 20
  fetchSmsTemplateList: data => axios.get(basic + '/smsTemplete/list', data)
}
