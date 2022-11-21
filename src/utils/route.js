import path from 'path'
/**
 * // 生成规则的路由信息表
 * @param {路由信息表} routes
 * @param {基础路径} basePath
 */
export function generateRoutes(routes, basePath = '') {
  const res = []
  routes.forEach(item => {
    // 不存在children,也不存在meta的,直接return
    if (isNull(item.children) && isNull(item.meta)) return false
    // 存在一个children,不存在meta的,进入递归
    if (isNull(item.meta) && !isNull(item.children)) {
      res.push(...generateRoutes(item.children))
      return false
    }
    // 存在children,存在meta的; 存在meta,不存在children
    // 合并路径
    const routePath = path.resolve(basePath, item.path)

    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = res.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if (route.meta.icon && route.meta.title) {
        res.push(route)
      }
    }
    if (item.children) {
      route.children.push(...generateRoutes(item.children, route.path))
    }
  })
  return res
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级(去掉重复路由，并且不改变路由层级)
 * @param {路由信息表} routes
 */
export function filterRoutes(routes) {
  // 获取当前路由的所有子路由
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}
/**
 * 获取所有的子路由
 * @param {路由信息表} routes
 */
export function getChildrenRoutes(routes) {
  const res = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      res.push(...route.children)
    }
  })
  return res
}

/**
 * 判断目标值为空对象或者空数组或null,undefined
 * @param {目标值} value
 * @returns
 */
export function isNull(value) {
  return (
    !value || JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]'
  )
}
