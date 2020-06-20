/**
 * 枚举入口文件，自动导入子目录中的文件，必须确保key不重复
 */


const modulesFiles = require.context('./', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const path = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')  
  if (path !== 'index') {
    const value = modulesFiles(modulePath)
    if (typeof value.default === 'object') {
      modules = Object.assign(modules, value.default)
    }
  }
  return modules
}, {})

export default {
  /**
   *  根据value值获取对应的label值
   *  this.$enums.getLabel('boolYes', true)
   */
  getLabel (key, value, options = []) {
    const enumArray = Array.isArray(options) && options.length ? options : this[key]
    if (Array.isArray(enumArray) && enumArray.length) {
      const enumItem = enumArray.find(d => d.value === value)
      if (enumItem) {
        return enumItem.label
      }
    }
    return ''
  },
  ...modules
}
  