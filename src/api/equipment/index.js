import axios from '@/api/axios'
import { basic, powerplan } from '@/api/prefix'

export default {
  // 添加停电设备的单位
  getAddBlackoutDeviceEnterprise: data => axios.get(basic + '/org/searchAllCityInfo', data),

  // 添加停电设备的变电站等级
  getAddBlackoutDeviceGrade: data => axios.get(powerplan + '/powerOffonAffectArea/getSubLevel', data),

  // 添加停电设备的变电站信息
  getAddBlackoutDeviceStatInfo: data => axios.get(powerplan + '/powerOffonAffectArea/searchsubstation', data),

  // 添加停电设备的线路信息
  getAddBlackoutDeviceLineInfo: data => axios.get(powerplan + '/powerOffonAffectArea/searchLineWithSvg', data),

  // 添加停电设备的台区信息
  getAddBlackoutDeviceTqInfo: data => axios.get(powerplan + '/powerOffonAffectArea/searchtg', data)
}
