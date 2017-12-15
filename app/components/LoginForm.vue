<template>
  <div>
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
    <div>
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="text" v-model="rEmail">
      </div>
      <div class="form-group">
        <label>Login</label>
        <input class="form-control" type="text" v-model="rLogin">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input class="form-control" type="text" v-model="rPass">
      </div>
      <button class="btn" @click="signup()">Signup</button>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        rEmail: '',
        rLogin: '',
        rPass: '',
        login: 'usa_com',
        password: 'test500500',
      }
    },
    computed: {
      ...mapState({
        token: state => state.user.token,
      }),
    },
    methods: {
      async logIn() {
        await this.$store.dispatch('user/login', {login: this.login, password: this.password});
      },
      async signup() {
        await this.$store.dispatch('user/signup', {email:this.rEmail, login: this.rLogin, password: this.rPass});
      },
    }
  }
</script>
