import i18n from '@/i18n'
import Fuse from 'fuse.js'
import router from '@/router'
import { filterRoutes, generateRoutes } from '@/utils/route.js'
import { computed } from 'vue'

/**
 * 生成可以搜索的路由
 * @param {*} routes
 */
export const generateSearchPool = (routes, res = [], prefixTitle = []) => {
  routes.forEach(route => {
    const data = {
      path: route.path,
      title: [...prefixTitle]
    }
    if (route.meta && route.meta.title) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }
    if (route.children.length) {
      res = generateSearchPool(route.children, res, data.title)
    }
  })
  return res
}

// 模糊搜索

export const initFuse = () => {
  const searchPool = computed(() =>
    generateSearchPool(generateRoutes(filterRoutes(router.getRoutes())))
  )
  const fuse = new Fuse(searchPool.value, {
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
  return fuse
}
