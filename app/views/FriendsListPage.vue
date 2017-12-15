<template>
  <div>
    <h1>Friends list</h1>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in friendList">
        <div class="row no-gutters">
          <div class="col-12 col-md-2">
            <img v-if="item['avatar']" :src="'https://clara-oswald-usa.com/api/file/open?name='+item['avatar']" style="width: 100%"/>
          </div>
          <div class="col-12 pl-0 pl-md-2 col-md-6">
            <span v-if="item['nickname']">nickname: {{item['nickname']}} <br></span>
            <span v-if="item['name']">name: {{item['name']}}<br></span>
            <span v-if="item['last_name']">last name: {{item['last_name']}}<br></span>
            <span v-if="item['phone']">phone: {{item['phone']}}<br></span>
            <span v-if="item['birthday']">birthday: {{item['birthday']}}<br></span>
            <span v-if="item['gender']">gender: {{item['gender']}}<br></span>
            <span v-if="item['job']">job: {{item['job']}}<br></span>
            <span v-if="item['length']">length: {{item['length']}}<br></span>
            <span v-if="item['weight']">weight: {{item['weight']}}<br></span>
          </div>
          <div class="col-12 pl-0 pl-md-2 col-md-2">
            <a href="#" @click.prevent="openPrivatDilaog(item.id)">Open dialog</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    mounted(){
    },
    computed: {
      ...mapState({
        token: state => state.user.token,
        friendList: state => state.friend.friendList,
      }),
    },
    methods: {
      async openPrivatDilaog(id) {
        const data = await this.$store.dispatch('messages/openDialogToUser', id);
        this.$router.push({ name: 'deposit-details', params: { id: data.idDialog }});
      },
    },
  }
</script>
