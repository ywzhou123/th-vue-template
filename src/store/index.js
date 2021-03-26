import { createStore } from 'vuex'
import getters from './getters'

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleNameArr = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')
  const moduleName = moduleNameArr[moduleNameArr.length - 1]
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = createStore({
  modules,
  getters
})

export default store
