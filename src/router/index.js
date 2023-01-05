import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import Layout from '@/layout'
import articelRoute from './modules/article'
import excelRoute from './modules/excel'
import userRoute from './modules/user'
import tableRoute from './modules/table'
import componentRoutes from './modules/components-demo'

/**
 * 公开路由
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: Layout,
    redirect: '/profile',
    name: 'profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // fix warning: No match found for location with path   https://github.com/vuejs/router/issues/359
  { path: '/:pathMatch(.*)', component: () => import('@/views/error-page/404') }
]

/**
 * 私有路由
 */
export const asyncRoutes = [
  articelRoute,
  excelRoute,
  userRoute,
  tableRoute,
  componentRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})
/**
 * 初始化路由,重置路由
 */
export function resetRoute() {
  const routes = store.getters.addRoutes
  if (routes.length) {
    for (const route of routes) {
      router.removeRoute(route.name)
    }
  }
}

export default router
