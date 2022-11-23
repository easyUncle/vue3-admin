import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEWS } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'en',
    tagViewsList: getItem(TAGS_VIEWS) || []
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
    },

    /**
     * 标签的处理
     */

    // 添加tags
    add2TagViewsList(state, tag) {
      const { tagViewsList } = state
      const has = tagViewsList.find(item => item.path === tag.path)
      if (!has) {
        tagViewsList.push(tag)
        setItem(TAGS_VIEWS, tagViewsList)
      }
    },
    // 移除标签
    removeTagView(state, paylaod) {
      const { type, index } = paylaod
      console.log(type, index)
      if (type === 'current') {
        state.tagViewsList.splice(index, 1)
      } else if (type === 'right') {
        state.tagViewsList.splice(
          index + 1,
          state.tagViewsList.length - index - 1
        )
      } else if (type === 'other') {
        state.tagViewsList = [state.tagViewsList[index]]
      } else if (type === 'all') {
        state.tagViewsList = []
      }
      setItem(TAGS_VIEWS, state.tagViewsList)
    },
    // 切换国际化时，重新生成tagviewsList
    setTagViewsTitle(state, { tag, index }) {
      state.tagViewsList[index] = tag
      setItem(TAGS_VIEWS, state.tagViewsList)
    }
  },
  actions: {
    removeTagView({ commit }, payload) {
      return new Promise(resolve => {
        commit('removeTagView', payload)
        resolve()
      })
    }
  }
}
