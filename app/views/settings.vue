<template>
  <div>
    <div v-if="token==null">
      404
    </div>
    <div v-else>
      <profile></profile>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import Profile from '../components/ProfileEditer.vue'

  export default {
    components: { 'profile':Profile },
    computed: {
      ...mapState({
        token: state => state.user.token
      }),
    }
  }
</script>
