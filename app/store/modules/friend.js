import api from '../../api'
const state = {
  friendList: [],
};

const mutations = {
  friendList: (s, p) => s.friendList = p,
};

const actions = {
  async loadFriends({state, dispatch, commit}){
    let friendList = await api.friends.list();
    commit('friendList', friendList);
  },
  async search({state, dispatch, commit}, data){
    return await api.friends.search(data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};