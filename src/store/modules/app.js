import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'en'
  }),

  mutations: {
    // 设置语言
    setLanguage(state, lang) {
      state.language = lang
      setItem(LANG, lang)
    },
    // 左侧菜单伸缩
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}
