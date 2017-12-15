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
  async logOut({state, dispatch, commit}){
      api.user.logOut();
      commit('login', '');
      commit('token', '');
      window.location.reload();
  },
  async signup({state, dispatch, commit}, data){
    await api.user.register(data.login, data.email, data.password);
    dispatch('login', {login: data.login, password: data.password});

  },
  async login({state, dispatch, commit}, data){
    commit('login', data.login);
    try{
      await api.user.login(data.login, data.password);
      await dispatch('loadSession');
      window.location.reload();
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
        console.error('profile load error', e);
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