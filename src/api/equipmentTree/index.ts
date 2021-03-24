import axios from '@/api/axios'
import { basic, powerplan, jyhpwyw } from '@/api/prefix'

export default {
  // 单位下拉
  fetchAllCityInfo: (data:any) => axios.get(basic + '/org/searchAllCityInfo', data),
  // 当前单位
  fetchCurrCity: (data:any) => axios.get(basic + '/org/searchCurrCity', data),
  // 获取变电站设备树
  fetchEquipmentSubstationList: (data:any) => axios.get(basic + '/equipment/substation/' + data.source + '/list/', data.filter),
  // 获取线路
  fetchEquipmentLine: (data:any) => axios.get(basic + '/equipment/line/' + data.source + '/sub-line-tree/' + data.id, data),
  // 获取台区数据
  fetchEquipmentTgList: (data:any) => axios.get(powerplan + '/equipment/transformer/searchtg', data),
  // 通过台区查询用户
  fetchEquipmentUserList: (data:any) => axios.get(basic + '/crm/cust/list/tg/' + data.tgIds, data.filter),
  // 电压下拉
  fetchVoltageOptions: (data:any) => axios.get(basic + '/interfaceCode/searchByType', data),
  // 获取开关数据
  fetchSwitchList: (data:any) => axios.get(powerplan + '/equipment/switch/search-switch', data),
  // 巡视设备列表
  fetchSbByLineId: (data:any) => axios.get(jyhpwyw + '/equipment/patrol/equipments', data)
}
