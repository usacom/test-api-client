import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  status: true,
}

const mutations = {
}

const actions = {
}

import user from './modules/user'
import friend from './modules/friend'

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    user,
    friend,
  }
})

export default store
