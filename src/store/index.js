// import Vue from 'vue'
// import Vuex from 'vuex'
import getters from './getters'

window.Vue.use(window.Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleNameArr = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')
  const moduleName = moduleNameArr[moduleNameArr.length - 1]
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new window.Vuex.Store({
  modules,
  getters
})

export default store
