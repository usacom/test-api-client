import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import HomePage from '../views/home.vue'
import SettingsPage from '../views/settings.vue'
import FriendsListPage from '../views/FriendsListPage.vue'
import SubscribesListPage from '../views/SubscribesListPage.vue'
import SearchPeoplePage from '../views/SearchPeoplePage.vue'
import MessagesIndex from '../views/messages/index.vue'
import DialogList from '../views/messages/list.vue'
import Dialog from '../views/messages/ShowDialog.vue'

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
          'user/loadSession',
          'friend/loadFriends',
        ],
      },
    },
    {
      path: '/subscribes', name: 'subscribesList',
      component: Vue.component('SubscribesListPage', SubscribesListPage),
      meta: {
        storeActions: [
          'user/loadSession',
          'friend/loadSubscribes',
          'friend/loadSubscribesRej',
        ],
      },
    },
    {
      path: '/search', name: 'searchPeople',
      component: Vue.component('SearchPeoplePage', SearchPeoplePage),
      meta: {
        storeActions: [
          'user/loadSession',
          'user/loadProfile',
          'friend/loadSubscribes',
        ],
      },
    },
    {
      path: '/messages',
      component: Vue.component('Messages', MessagesIndex),
      meta: {
        storeActions: [
          'user/loadSession',
          'user/loadProfile',
          'messages/loadList',
        ],
      },
      children: [
        {
          path: 'list', name: 'messages-dialogList',
          component: Vue.component('DialogList', DialogList),
        },
        {
          path: 'dialog/id:id', name: 'deposit-details',
          component: Vue.component('Dialog', Dialog),
          props: true,
          meta: {
            storeActions: [
              async (to, from, { state, dispatch }) => {
                const id = to.params.id;
                console.log(id);
                await dispatch('messages/loadDialog', {id});
              },
            ],
          },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  store.commit('setLoadingState', true);
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
  if (tasks.length > 0) {
    try {
      await Promise.all(tasks);
    } catch (e) {
      next(e);
    }
  }
  next();
});
router.afterEach((to, from) => {
  store.commit('setLoadingState', false);
});

export default router
