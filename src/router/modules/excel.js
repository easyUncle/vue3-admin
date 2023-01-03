import Layout from '@/layout'

const excelRoute = {
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
}
export default excelRoute
