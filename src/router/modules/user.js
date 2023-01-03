import Layout from '@/layout'

const userRoute = {
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
}

export default userRoute
