import axios from '@/api/axios'
import { basic, supervision } from '@/api/prefix'

export default {
  // 供电单位下拉列表
  fetchHostOrg: data => axios.get(basic + '/org/co-operation/list', data),

  // 参考模板下拉列表
  fetchTemplateList: data => axios.get(supervision + '/template/list', data),


  // 督办对象下拉列表
  // type: SUPERVICE_OBJECT
  // flag: 1
  // apply: 01
  fetchObjectList: data => axios.get(supervision + '/template/list/supervision-object-type', data),

  // 发送变更短信
  fetchChangeMsg: data => axios.get(supervision + '/supervision/fill-message', data),

  // 查询督办、抄送人员
  // templeteId: 40288e3f7114462601711463824f000a
  // type: 2
  fetchSearchPerson: data => axios.get(supervision + '/supervision/list/supervision-copy-person', data),

  // 督办人员信息
  // personType: 01 02 03
  // type: 01
  // sheetId: A27654A9064335FCE053BE0EA8C01D84
  // flag: false
  fetchPersionDetail: data => axios.get(supervision + '/supervision/getPerson', data),
  fetchContactList: data => axios.get(supervision + '/supervision/getContactListByDuties', data),

  // 非抢市级用户
  // "filter":"sheetId="+me.sheetId
  fetchDistribute: data => axios.get('/sgpssc/sg186/rest/distribute/search', data),

  // 发送
  fetchSuperviceSave: data => axios.post(supervision + '/supervision/submit', data),

  // 督办人员列表
  // type: 1234
  fetchSuperviceSendUser: data => axios.get(supervision + '/template/list/supervision-object', data),

  // 删除常用联系人
  fetchDelPerson: data => axios.get(supervision + '/template/delCYLXR', data),

  // 常用联系人详情
  fetchGetPerson: data => axios.get(supervision + '/template/getCYLXR', data),

  // 保存常用联系人
  fetchSavePerson: data => axios.get(supervision + '/template/saveCYLXR', data)




}
