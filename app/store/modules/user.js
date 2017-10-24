import api from '../../api'
const state = {
  login: '',
  token: '',
  profile: null
};

const mutations = {
  login: (s, p) => s.login = p,
  token: (s, p) => s.token = p,
  profile: (s, p) => s.profile = p,
};

const actions = {
  async login({state, dispatch, commit}, data){
    commit('login', data.login);
    try{
      await api.user.login(data.login, data.password);
      await dispatch('loadSession');
      return true;
    }catch (e){
      console.error(e);
      return false;
    }
  },
  async loadProfile({state, dispatch, commit}){
    if(state.token != null){
      try{
        let profile = await api.user.profile();
        commit('profile', profile);
      }catch(e){
        console.error(e);
      }
    }
  },
  async saveProfile({state, dispatch, commit}, parms){
    let status = await api.user.updateProfile(parms);
    await dispatch('loadProfile');
    console.log(status);
    return status;
  },
  async loadSession({state, dispatch, commit}){
    let token = await api.user.getSession();
    commit('token', token);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};