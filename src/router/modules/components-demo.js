import Layout from '@/layout'

const componentRoutes = {
  path: '/components-demo',
  name: 'components-demo',
  component: Layout,
  redirect: '/components-demo/editor',
  meta: {
    title: 'componentsDemo',
    icon: 'component'
  },
  children: [
    {
      path: '/components-demo/editor',
      component: () => import('@/views/components-demo/editor/index.vue'),
      name: 'editor',
      meta: { title: 'editor', icon: 'editor' }
    }
  ]
}
export default componentRoutes
