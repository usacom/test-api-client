<template>
  <div>
    <div v-if="token==null">
      <loin-form></loin-form>

    </div>
    <div v-else>
      <h1>You logined.</h1>
      <profile></profile>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import Profile from '../components/Profile.vue'
  import LoginForm from '../components/LoginForm.vue'

  export default {
    components: {
      'profile':Profile,
      'loin-form': LoginForm
    },
    computed: {
      ...mapState({
        token: state => state.user.token
      }),
    }
  }
</script>
