// https://github.com/ktsn/vuex-class
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { State as User } from './modules/user'

export interface State {
  user: User
}

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.ts$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  const moduleNameArr:any[] = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')
  const moduleName:string = moduleNameArr[moduleNameArr.length - 1];
  (<any>modules)[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
