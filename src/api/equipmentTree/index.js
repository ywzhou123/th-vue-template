import axios from '@/api/axios'
import { basic, powerplan } from '@/api/prefix'

export default {
  // 获取变电站设备树
  fetchEquipmentSubstationList: data => axios.get(basic + '/equipment/substation/' + data.source + '/list/', data.filter),

  // 获取线路
  fetchEquipmentLine: data => axios.get(basic + '/equipment/line/' + data.source + '/sub-line-tree/' + data.id),

  // 获取台区数据
  fetchEquipmentTgList: data => axios.get(powerplan + '/powerOffonAffectArea/searchtg', data),

  // 通过台区查询用户
  fetchEquipmentUserList: data => axios.get(basic + '/crm/cust/list/tg/' + data.tgIds, data.filter),

  // 电压下拉
  fetchVoltageOptions: data => axios.get(basic + '/interfaceCode/searchByType', data)
}
