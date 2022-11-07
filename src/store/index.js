import { createStore } from 'vuex'
import user from './modules/user'
import getters from './getters'
console.log(getters)
export default createStore({
  getters,
  modules: {
    user
  }
})
