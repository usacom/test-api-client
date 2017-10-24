import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import HomePage from '../views/home.vue'
import SettingsPage from '../views/settings.vue'
import FriendsListPage from '../views/FriendsListPage.vue'
import SearchPeoplePage from '../views/SearchPeoplePage.vue'

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active-exact',
  routes: [
    {
      path: '/', name: 'home',
      component: Vue.component('HomePage', HomePage),
      meta: {
        storeActions: [
          'user/loadSession',
          'user/loadProfile'
        ],
      }
    },
    {
      path: '/settings', name: 'settings',
      component: Vue.component('SettingsPage', SettingsPage),
      meta: {
        storeActions: [
          'user/loadSession',
          'user/loadProfile'
        ],
      }
    },
    {
      path: '/friend', name: 'friendsList',
      component: Vue.component('FriendsListPage', FriendsListPage),
      meta: {
        storeActions: [
          'user/loadSession'
        ],
      },
    },
    {
      path: '/search', name: 'searchPeople',
      component: Vue.component('SearchPeoplePage', SearchPeoplePage),
      meta: {
        storeActions: [
          'user/loadSession',
          'user/loadProfile'
        ],
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  let tasks = [];
  for (let i = 0; i < to.matched.length; i++) {
    let actions = to.matched[i].meta.storeActions || [];
    for (let ai = 0; ai < actions.length; ai++) {
      let action = actions[ai];
      console.log('need dispatch', action);
      if (typeof(action) === 'function') {
        tasks.push(action(to, from, store));
      } else {
        tasks.push(store.dispatch(action));
      }
    }
  }
  next();
});

export default router
