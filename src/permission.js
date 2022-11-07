import router from './router'
import store from './store'

const whiteList = ['/login']
/**
 * @to 要跳转的下一个路由
 * @from 跳转到下一个路由的前一个路由
 * @next
 */
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (token) {
    // 用户登录后，`token` 未过期之前，不允许进入 `login` 页面
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 当用户未登陆时，不允许进入除 `login` 之外的其他页面
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
