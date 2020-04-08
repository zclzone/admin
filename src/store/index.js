import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import getters from './getters'
import userStore from './modules/userStore'
import permissionStore from './modules/permissionStore'

export default new Vuex.Store({
  getters,
  modules: {
    user: userStore,
    permission: permissionStore,
  }
})
