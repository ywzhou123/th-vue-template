import axios from '@/api/axios'

export default {
  // 配电线路检修停运-设备列表
  fetchEquimentOptions: data => axios.get('/dnos/line/curve/query/equip/selectoption/' + data.id),
  // 线路曲线类型
  fetchLineCharType: data => axios.get('/bms/system/dictionary/list/pmcs/qxlx_xl', data),
  // 线路曲线
  fetchLineCharLineData: data => axios.get('/dnos/line/curve/query/curvechat', data)
}
