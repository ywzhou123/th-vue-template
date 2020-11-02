const getters = {
  userInfo: state => state.user.userInfo,
  psscUserInfo: state => state.user.psscUserInfo,
  access_token: state => state.user.access_token,
  roles: state => state.user.roles
}
export default getters
