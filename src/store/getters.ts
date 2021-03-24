import { GetterTree } from 'vuex'
import { State } from './index'

const getters: GetterTree<State, any> = {
  userInfo: (state: State) => state.user.userInfo,
  psscUserInfo: (state: State) => state.user.psscUserInfo,
  access_token: (state: State) => state.user.access_token,
  roles: (state: State) => state.user.roles
}
export default getters
