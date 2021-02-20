import axios from '@/api/axios'
import { basic } from '@/api/prefix'

export default {
  // 供电单位下拉列表
  fetchHostOrg: data => axios.get(basic + '/org/co-operation/list', data)
}
