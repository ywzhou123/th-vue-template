/*
 * 自动将apis中所有js文件中的接口方法添加到 Vue.prototype.$request 中
 */

const excludes = ['index', 'axios', 'prefix']

const modulesFiles = require.context('./', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const path = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  if (!excludes.includes(path)) {
    const value = modulesFiles(modulePath)
    modules = Object.assign(modules, value.default)
  }
  return modules
}, {})

export default modules
