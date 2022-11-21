/**
 * 生成可以搜索的路由
 * @param {*} routes
 */
export const generateSearchPool = (routes, res = [], prefixTitle = []) => {
  routes.forEach(route => {
    const data = {
      path: route.path,
      title: [...prefixTitle, route.meta.title]
    }
    res.push(data)
    if (route.children.length) {
      res = generateSearchPool(route.children, res, data.title)
    }
  })
  console.log(res)
  return res
}

// [
//   {
//     path:'',
//     title:[],
//   }
// ]
