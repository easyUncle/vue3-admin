import { login } from '@/api/user'
import { getToken, setToken } from '../../utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getToken()
  }),
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const { username, password } = userInfo
        login({
          username,
          password
        })
          .then(data => {
            commit('SET_TOKEN', data.token)
            setToken(data.token)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
