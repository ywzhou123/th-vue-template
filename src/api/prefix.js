/**
 * 根据模块名返回接口前缀，必须是列表，且至少一条数据
 * 可配置多个列表元素，通过oldIndex和newIndex控制去取第几个元素
 */
const prefix = {
  basic: ['/sgpssc/basic/rest','/bms'],
  powerplan: ['/sgpssc/powerplan/rest', '/blackout-info-release'],
  sms: ['/sgpssc/sms/rest', '/blackout-info-release'],
  report: ['/sgpssc/report/rest', '/blackout-info-release'],
  cis: ['/sgpssc/cis/rest', '/rrcs'],
}

/**
 * 获取接口前缀
 * @param {*} key 模块名称
 * @param {*} oldIndex 原系统值的下标
 * @param {*} newIndex 微服务系统值的下标
 *
 * GLOBAL_IS_ORIGIN 是否启用原系统方式，在public/index.html中配置
 */
const getPrefix = function (key, oldIndex = 0, newIndex = 1) {
  return window.GLOBAL_IS_ORIGIN ? prefix[key][oldIndex] : prefix[key][newIndex]
}
export default getPrefix

export const basic = getPrefix('basic')
export const powerplan = getPrefix('powerplan')
export const sms = getPrefix('sms')
export const report = getPrefix('report')
export const cis = getPrefix('cis')
