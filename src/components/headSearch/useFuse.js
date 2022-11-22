import i18n from '@/i18n'
import Fuse from 'fuse.js'
import router from '@/router'
import { filterRoutes, generateRoutes } from '@/utils/route.js'
import { computed } from 'vue'
import store from '../../store'

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

/**
 * 初始化Fuse
 * @returns fuse实例
 */
export const initFuse = async () => {
  const searchPool = computed(() =>
    generateSearchPool(generateRoutes(filterRoutes(router.getRoutes())))
  )
  let searchPoolVal = searchPool.value
  if (store.getters.language === 'zh') {
    searchPoolVal = await addPinyinField(searchPoolVal)
  }
  console.log(searchPoolVal)
  const fuse = new Fuse(searchPoolVal, {
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'pinyinTitle',
        weight: 0.3
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
  return fuse
}
/**
 * 支持拼音输入
 */
export const addPinyinField = async searchPool => {
  const { default: pinyin } = await import('pinyin')
  return searchPool.map(item => {
    const title = item.title
    if (Array.isArray(title)) {
      const pinyinTitle = title.map(v => {
        return pinyin(v, {
          style: pinyin.STYLE_NORMAL
        }).join('')
      })
      item.pinyinTitle = pinyinTitle
    }
    return item
  })
}
