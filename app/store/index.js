import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: true,
  status: true,
};

const mutations = {
  setLoadingState (s, p) {
    s.isLoading = p;
  },
};

const actions = {
};

import user from './modules/user'
import friend from './modules/friend'
import messages from './modules/messages'

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    user,
    friend,
    messages,
  }
});

export default store
