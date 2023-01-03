import Layout from '@/layout'

const articelRoute = {
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

export default articelRoute
