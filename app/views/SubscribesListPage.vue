<template>
  <div>
    <h1>Subscribes list</h1>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in subscribesList">
        <div class="row no-gutters">
          <div class="col-12 col-md-2">
            <img v-if="item['avatar']" :src="'https://clara-oswald-usa.com/api/file/open?name='+item['avatar']" style="width: 100%"/>
          </div>
          <div class="col-12 pl-0 pl-md-2 col-md-6">
            <span v-if="item['nickname']">nickname: {{item['nickname']}} <br></span>
            <span v-if="item['name']">name: {{item['name']}}<br></span>
            <span v-if="item['last_name']">last name: {{item['last_name']}}<br></span>
            <span v-if="item['birthday']">birthday: {{item['birthday']}}<br></span>
            <span v-if="item['gender']">gender: {{item['gender']}}<br></span>
          </div>
          <div class="col-12 pl-0 pl-md-2 col-md-2">
            <a href="#" @click.prevent="openPrivatDilaog(item.id)">Open dialog</a>
            <br>
            <a href="#" @click.prevent="accept(item.id)">Accept</a>
            <br>
            <a href="#" @click.prevent="reject(item.id)">Reject</a>
          </div>
        </div>
      </li>
    </ul>
    <h1>Subscribes reject list</h1>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in subscribesRejList">
        <div class="row no-gutters">
          <div class="col-12 col-md-2">
            <img v-if="item['avatar']" :src="'https://clara-oswald-usa.com/api/file/open?name='+item['avatar']" style="width: 100%"/>
          </div>
          <div class="col-12 pl-0 pl-md-2 col-md-6">
            <span v-if="item['nickname']">nickname: {{item['nickname']}} <br></span>
            <span v-if="item['name']">name: {{item['name']}}<br></span>
            <span v-if="item['last_name']">last name: {{item['last_name']}}<br></span>
            <span v-if="item['birthday']">birthday: {{item['birthday']}}<br></span>
            <span v-if="item['gender']">gender: {{item['gender']}}<br></span>
          </div>
          <div class="col-12 pl-0 pl-md-2 col-md-2">
            <a href="#" @click.prevent="openPrivatDilaog(item.id)">Open dialog</a>
            <br>
            <a href="#" @click.prevent="accept(item.id)">Accept</a>
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
        subscribesList: state => state.friend.subscribesList,
        subscribesRejList: state => state.friend.subscribesRejList,
      }),
    },
    methods: {
      async openPrivatDilaog(id) {
        const data = await this.$store.dispatch('messages/openDialogToUser', id);
        this.$router.push({ name: 'deposit-details', params: { id: data.idDialog }});
      },
      async accept(id) {
        await this.$store.dispatch('friend/acceptRequest', id);
      },
      async reject(id) {
        await this.$store.dispatch('friend/denyRequest', id);
      },
    }
  }
</script>
