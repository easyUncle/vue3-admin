import Layout from '@/layout'

const tableRoute = {
  path: '/table',
  name: 'table',
  component: Layout,
  redirect: '/table/dynamic-table',
  meta: {
    title: 'table',
    icon: 'table'
  },
  children: [
    {
      path: '/table/dynamic-table',
      component: () => import('@/views/table/dynamic-table'),
      name: 'dynamicTable',
      meta: { title: 'dynamicTable', icon: 'dynamic-table' }
    },
    {
      path: '/table/drag-table',
      name: 'dragTable',
      component: () => import('@/views/table/DragTable'),
      meta: {
        title: 'dragTable',
        icon: 'drag-table'
      }
    },
    {
      path: '/table/inline-edit-table',
      name: 'inlineEditTable',
      component: () => import('@/views/table/InlineEditTable.vue'),
      meta: {
        title: 'inlineEditTable',
        icon: 'inline-edit-table'
      }
    },
    {
      path: '/table/complex-table',
      name: 'complexTable',
      component: () => import('@/views/table/complex-table'),
      meta: {
        title: 'complexTable',
        icon: 'complex-table'
      }
    }
  ]
}
export default tableRoute
