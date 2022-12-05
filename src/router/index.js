import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
/**
 * 公开路由
 */
export const constantRoutes = [
  {
    path: '/login',
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
  }
]

/**
 * 私有路由
 */
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel',
      roles: ['admin', 'edictor']
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/user-manage/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role',
          roles: ['admin']
        }
      },
      {
        path: '/user/permission',
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
    // 不显示在导航栏之中
    path: '/excel',
    name: 'excel',
    component: Layout,
    redirect: '/excel/export-excel',
    meta: {
      title: 'excel',
      icon: 'excel',
      roles: ['admin', 'edictor']
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
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article-ranking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        component: () => import('@/views/article-detail/index'),
        hidden: true,
        meta: {
          title: 'articleDetail'
        }
      },
      {
        path: '/article/create',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/article-create/index'),
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
  routes: [...constantRoutes, ...asyncRoutes]
})

export default router
