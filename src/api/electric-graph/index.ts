import axios from '@/api/axios'

export default {
  // 配电线路检修停运-设备列表
  fetchEquimentOptions: (data:any) => axios.get('/dnos/line/curve/query/equip/selectoption/' + data.id, data),
  // 线路曲线类型
  fetchLineCharType: (data:any) => axios.get('/bms/system/dictionary/list/pmcs/qxlx_xl', data),
  // 线路曲线
  fetchLineCharLineData: (data:any) => axios.get('/dnos/line/curve/query/curvechat', data)
}
