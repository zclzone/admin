import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setLang } from '@/utils/cookie-util'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  authRoutes: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles || ['visitor']
  },
  SET_AUTH_ROUTES: (state, authRoutes) => {
    state.authRoutes = authRoutes
  }
}

const actions = {
  login ({ commit, state }, userInfo) {
    const { username, password, lang } = userInfo
    return new Promise((resolve, reject) => {
      login({ username, password, lang }).then(res => {
        const { data } = res
        if (data.token) {
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          setLang(lang || 'CN')
          resolve()
        } else {
          reject(data.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(res => {
        const { data } = res.data
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        //刷新token
        const { roles, name, avatar, introduction, authRoutes } = data
        commit('SET_NAME', name)
        commit('SET_ROLES', roles)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_AVATAR', avatar)
        commit('SET_AUTH_ROUTES', authRoutes)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout ({ state, commit }) {
    return new Promise(resolve => {
      logout(state.token).then((res) => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve(res.data)
      })
    })
  },
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      commit('SET_ROLES', [])
      commit('SET_AUTH_ROUTES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}