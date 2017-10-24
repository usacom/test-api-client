import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
// import Notifications from 'vue-notification'
import App from './App.vue'
import FDropdown from './components/btn-dropdown.vue'

//
import router from './router'
import store from './store'

sync(store, router);
// Vue.use(Notifications);
Vue.component('f-dropdown', FDropdown);

const app = new Vue({
  store,
  router,
  components: { App}
}).$mount('#app');
