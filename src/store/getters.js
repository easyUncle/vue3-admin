import variables from '@/styles/variables.scss'
const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permissionRoutes: state => state.permission.routes,
  cssVar: state => variables,
  sidebarOpened: state => state.app.sidebarOpened
}
export default getters
