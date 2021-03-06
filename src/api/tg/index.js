import axios from '@/api/axios'
import { basic, powerplan } from '@/api/prefix'

export default {
  // 单位下拉
  fetchAllCityInfo: data => axios.get(basic + '/org/searchAllCityInfo', data),
  // 当前单位
  fetchCurrCity: data => axios.get(basic + '/org/searchCurrCity', data),
  // 变电站列表
  fetchSubstationList: data => axios.get(powerplan + '/powerOffonAffectArea/searchsubstation', data),
  // 线路列表
  fetchLineList: data => axios.get(powerplan + '/powerOffonAffectArea/searchline', data),
  // 台区列表
  fetchTgList: data => axios.get(powerplan + '/powerOffonAffectArea/searchtg', data)
}
