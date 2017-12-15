<template>
  <div>
    <div id="init-load-spinner" v-if="isLoading"><div class="spinner-big"></div></div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">

      <div class="collapse navbar-collapse container">
        <ul class="navbar-nav" v-if="token != null">
        <li class="nav-item">
          <router-link :to="{name: 'home'}" class="nav-link">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'settings'}" class="nav-link">
            Settings profile
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'friendsList'}" class="nav-link">
            Friends
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'subscribesList'}" class="nav-link">
            Subscribes
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'searchPeople'}" class="nav-link">
            People search
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'messages-dialogList'}" class="nav-link">
            Dialogs
          </router-link>
        </li>
        <li class="nav-item">
          <a href="#" @click.prevent="logOut()" class="nav-link">
            Log Out
          </a>
        </li>
      </ul>
        <ul class="navbar-nav" v-else>
          <li class="nav-item">
            <router-link :to="{name: 'home'}" class="nav-link">
              Log In
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view class="container"></router-view>
  </div>
</template>
<style lang="scss">
  body {
    background-color: #f5f8fa;
  }
  #init-load-spinner {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #2d2d2d;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    color: #ca0000;
  }

  .spinner-big,
  .spinner-big:before,
  .spinner-big:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: load7 1.8s infinite ease-in-out;
    animation: load7 1.8s infinite ease-in-out;
  }

  .spinner-big {
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  .spinner-big:before,
  .spinner-big:after {
    content: '';
    position: absolute;
    top: 0;
  }

  .spinner-big:before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner-big:after {
    left: 3.5em;
  }

  @-webkit-keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }

  @keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }

</style>
<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        token: state => state.user.token
      }),
      isLoading () {
        return this.$store.state.isLoading;
      },
    },
    methods: {
      async logOut() {
        await this.$store.dispatch('user/logOut');
      }
    }
  }
</script>
