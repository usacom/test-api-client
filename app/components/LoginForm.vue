<template>
  <div>
    <div class="form-group">
      <label>Login</label>
      <input class="form-control" type="text" v-model="login">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input class="form-control" type="password" v-model="password">
    </div>
    <button class="btn" @click="logIn()">login</button>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        login: 'usa_com',
        password: 'test500500',
      }
    },
    computed: {
      ...mapState({
        token: state => state.user.token,
      }),
    },
    methods:{
      async logIn(){
        console.log('test');
        await this.$store.dispatch('user/login', {login:this.login, password:this.password});
      }
    }
  }
</script>
