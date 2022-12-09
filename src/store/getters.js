import variables from '@/styles/variables.scss'
const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  points: state => state.user.points,
  hasUserInfo: state => state.user.hasUserInfo,
  permissionRoutes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  cssVar: state => state.theme.cssVar,
  sidebarOpened: state => state.app.sidebarOpened,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor,
  tagViewsList: state => state.app.tagViewsList
}
export default getters
