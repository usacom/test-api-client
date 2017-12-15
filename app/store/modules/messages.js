import api from '../../api'
const state = {
  list: [],
  dialogs: {},
};

const mutations = {
  list: (s, p) => s.list = p,
  loadDialog: (s, p) => s.dialogs[p.id] = p,
};

const actions = {
  async loadList({state, dispatch, commit}){
    const list = await api.messages.list();
    commit('list', list);
  },
  async openDialogToUser({state, dispatch, commit}, id){
    let dialog;
    try{
      const data = await api.messages.openPrivate(id);
      dialog = data[0];
      dispatch('loadList');
      console.log('dialog', dialog)
    } catch (e){
      console.log('eeeeeeee');
      console.warn(e);
    }
    dispatch('loadDialog', {id: dialog.idDialog});
    return dialog;
  },
  async loadDialog({state, dispatch, commit}, params){
    console.log(params);
    const id = params.id;
    const pageNumber = params.pageNumber ? params.pageNumber : 1;
    const dialog = await api.messages.showDialog(id, {pageNumber});
    dialog.id = id;
    commit('loadDialog', dialog);
  },
  async sendMessage({state, dispatch, commit}, params){
    console.log('send');
    const id = params.id;
    const message = params.message;
    await api.messages.sendMessage(id, message);
    location.reload();
    console.log('reload');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};