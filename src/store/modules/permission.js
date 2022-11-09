import { constantRoutes, asyncRoutes } from '@/router'

/**
 *
 * @param {单个路由信息} route
 * @param {用户的角色数组} roles
 */
export function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 根据用户角色递归筛选路由
 * @param {动态获取的路由} routes
 * @param {角色} roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    // 防止改变原来的路由信息，定义个中间变量
    const tmp = {
      ...route
    }
    if (hasPermission(tmp, roles) && tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children, roles)
      res.push(tmp)
    }
  })
  return res
}

const state = {
  addRoutes: [],
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    console.log(roles)
    return new Promise(resolve => {
      let accessRoutes
      if (roles.includes('admin')) {
        accessRoutes = asyncRoutes || []
      } else {
        accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
