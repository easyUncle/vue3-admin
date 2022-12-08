import { login, getUserInfo } from '@/api/user'
import { getToken, setTimestamp, setToken } from '../../utils/auth'
import { removeAllItem } from '@/utils/storage.js'
import router, { resetRoute } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    token: getToken(),
    userInfo: {},
    avatar: '',
    points: []
  }),
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_ROLES(state, roles) {
      state.userInfo = roles
    },
    SET_NAME(state, name) {
      state.name = name
    },
    SET_AVATAR(state, avatar) {
      state.avatar = avatar
    },
    SET_INTRODUCTION(state, introduction) {
      state.introduction = introduction
    },
    SET_POINTS(state, points) {
      state.points = points
    }
  },
  actions: {
    // 登入
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
            // 保存登入时间戳
            setTimestamp()
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 获取用户信息
    async getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(res => {
            if (!res) {
              reject(new Error('Verification failed, please Login again.'))
            }

            const { roles, name, avatar, introduction, point } = res

            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject(new Error('getInfo: roles must be a non-null array!'))
            }

            commit('SET_ROLES', roles)
            commit('SET_NAME', name)
            commit('SET_AVATAR', avatar)
            commit('SET_INTRODUCTION', introduction)
            commit('SET_POINTS', point)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 登出
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        router.push('/login')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        resetRoute()
        removeAllItem()
        resolve()
      })
    }
  }
}
