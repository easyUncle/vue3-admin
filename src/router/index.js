import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import store from '../store'
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
  {
    path: '/user',
    component: Layout,
    redirect: '/user/manage',
    name: 'user',
    meta: {
      title: 'user',
      icon: 'personnel',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: '/user/manage',
        name: 'userManage',
        component: () => import('@/views/user-manage/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        name: 'userRole',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role',
          roles: ['admin']
        }
      },
      {
        path: '/user/permission',
        name: 'userPermission',
        component: () => import('@/views/permission-list/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission',
          roles: ['admin']
        }
      },
      {
        // 不显示在导航栏之中
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user-info/index'),
        hidden: true,
        meta: {
          title: 'userInfo'
        }
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    component: Layout,
    redirect: '/excel/export-excel',
    meta: {
      title: 'excel',
      icon: 'excel',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: '/excel/export-excel',
        component: () => import('@/views/excel/ExportExcel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel', icon: 'export-excel' }
      },
      {
        path: '/excel/import-excel',
        name: 'uploadExcel',
        component: () => import('@/views/excel/ImportExcel'),
        meta: {
          title: 'uploadExcel',
          icon: 'upload-excel'
        }
      },
      {
        path: '/excel/select-excel',
        name: 'selectExcel',
        component: () => import('@/views/excel/SelectExcel'),
        meta: {
          title: 'selectExcel',
          icon: 'select-excel'
        }
      },
      {
        path: '/excel/merge-header-excel',
        name: 'mergeHeaderExcel',
        component: () => import('@/views/excel/MergeHeaderExcel'),
        meta: {
          title: 'mergeHeaderExcel',
          icon: 'merge-header-excel'
        }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    name: 'article',
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article-ranking/index'),
        name: 'articleRanking',
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        component: () => import('@/views/article-detail/index'),
        name: 'articleDetail',
        hidden: true,
        meta: {
          title: 'articleDetail'
        }
      },
      {
        path: '/article/create',
        component: () => import('@/views/article-create/index'),
        name: 'articelCreate',
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/article-create/index'),
        name: 'articleEditor',
        hidden: true,
        meta: {
          title: 'articleEditor'
        }
      }
    ]
  }
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
