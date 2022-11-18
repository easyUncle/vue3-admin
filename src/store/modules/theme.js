import { DEFAULT_COLOR, MAIN_COLOR } from '../../constant'
import { setItem, getItem } from '../../utils/storage'
import variables from '@/styles/variables.scss'
import { generateColor } from '@/utils/theme.js'
export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    cssVar: {
      ...variables,
      ...generateColor(getItem(MAIN_COLOR) || DEFAULT_COLOR)
    }
  }),
  mutations: {
    setMainColor(state, primaryColor) {
      state.mainColor = primaryColor
      state.cssVar.menuBg = primaryColor
      setItem(MAIN_COLOR, primaryColor)
    }
  }
}
