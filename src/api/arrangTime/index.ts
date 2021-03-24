import axios from '@/api/axios'
import { basic, cis } from '@/api/prefix'

export default {
  // 数据字典
  fetchSearchType: (data:any) => axios.get(basic + '/system/dictionary/list/pssc/' + data.types, data),

  // 供电单位下拉列表
  fetchHostOrg: (data:any) => axios.get(basic + '/org/co-operation/list', data),

  // 新建约时工单
  fetchCreateArrangeTime: (data:any) => axios.post(cis + '/arrangeTimeSheet/submit', data),

  // 查询母单最近派单信息
  fetchGetDisptachSheet: (data:any) => axios.get(cis + '/accept95598/getNewDispatchSheetByAppNo', data),

  // 母单发起约时工单
  fetchDisptachArrangeTime: (data:any) => axios.get(cis + '/arrangeTimeSheetDisptach/doDispatchSheet', data)

}
