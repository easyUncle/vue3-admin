import { createStore } from 'vuex'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import app from './modules/app'
import theme from './modules/theme'
export default createStore({
  getters,
  modules: {
    user,
    permission,
    app,
    theme
  }
})
