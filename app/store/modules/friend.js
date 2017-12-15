import api from '../../api'
const state = {
  friendList: [],
  subscribesList: [],
  subscribesRejList: [],
};

const mutations = {
  friendList: (s, p) => s.friendList = p,
  subscribesList: (s, p) => s.subscribesList = p,
  subscribesRejList: (s, p) => s.subscribesRejList = p,
};

const actions = {
  async acceptRequest({state, dispatch, commit}, id){
    await api.friends.acceptRequest(id);
    dispatch('loadSubscribesRej');
    dispatch('loadSubscribes');
  },
  async denyRequest({state, dispatch, commit}, id){
    await api.friends.denyRequest(id);
    dispatch('loadSubscribesRej');
    dispatch('loadSubscribes');
  },
  async loadSubscribesRej({state, dispatch, commit}, page = 0){
    let subscribesList = await api.friends.subscribes(2, page);
    commit('subscribesRejList', subscribesList);
  },
  async loadSubscribes({state, dispatch, commit}, page = 0){
    let subscribesList = await api.friends.subscribes(0, page);
    commit('subscribesList', subscribesList);
  },
  async loadFriends({state, dispatch, commit}){
    let friendList = await api.friends.list();
    commit('friendList', friendList);
  },
  async search({state, dispatch, commit}, data){
    return await api.friends.search(data);
  },
  async sendRequest({state, dispatch, commit}, id){
    return await api.friends.sendRequest({id});
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};