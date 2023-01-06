import Layout from '@/layout'

const chartsRoute = {
  path: '/charts',
  name: 'charts',
  component: Layout,
  redirect: '/charts/waterChart',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
  children: [
    {
      path: '/charts/waterChart',
      component: () => import('@/views/charts/waterChart'),
      name: 'waterChart',
      meta: { title: 'waterChart', icon: 'waterChart' }
    },
    {
      path: '/charts/pieChart',
      name: 'pieChart',
      component: () => import('@/views/charts/pieChart'),
      meta: {
        title: 'pieChart',
        icon: 'pie-chart'
      }
    },
    {
      path: '/charts/lineChart',
      name: 'lineChart',
      component: () => import('@/views/charts/lineChart'),
      meta: {
        title: 'lineChart',
        icon: 'line-chart'
      }
    },
    {
      path: '/charts/columnChart',
      name: 'mergeHeaderExcel',
      component: () => import('@/views/charts/columnChart'),
      meta: {
        title: 'columnChart',
        icon: 'column-chart'
      }
    },
    {
      path: '/charts/nestedChart',
      name: 'nestedChart',
      component: () => import('@/views/charts/nestedChart'),
      meta: {
        title: 'nestedChart',
        icon: 'nested-chart'
      }
    },
    {
      path: '/charts/radarChart',
      name: 'radarChart',
      component: () => import('@/views/charts/radarChart'),
      meta: {
        title: 'radarChart',
        icon: 'radar-chart'
      }
    }
  ]
}
export default chartsRoute
