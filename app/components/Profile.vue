<template>
  <div>
    <!--{{profile}}-->
    <ul class="list-group" v-if="profile != null">
      <li class="list-group-item">
        nickname: {{profile['nickname']}}
      </li>
      <li class="list-group-item">
        email: {{profile['email']}}
      </li>
      <li class="list-group-item">
        name: {{profile['name']}}
      </li>
      <li class="list-group-item">
        last name: {{profile['last_name']}}
      </li>
      <li class="list-group-item">
        phone: {{profile['phone']}}
      </li>
      <li class="list-group-item">
        Birthday: {{profile['birthday']}}
      </li>
      <li class="list-group-item">
        Gender: {{profile['gender']}}
      </li>
      <li class="list-group-item">
        Job: {{profile['job']}}
      </li>
      <li class="list-group-item">
        Length: {{profile['length']}}
      </li>
      <li class="list-group-item">
        Weight: {{profile['weight']}}
      </li>
      <li class="list-group-item">
        <img :src="'http://band2.dev/api/file/open?name='+profile['avatar']" style="width: 100%"/>
        <!--Avatar: {{profile['avatar']}}-->
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    mounted(){
//      this.$store.dispatch('user/loadProfile');
    },
    computed: {
      ...mapState({
        profile: state => state.user.profile
      }),
    }
  }
</script>
