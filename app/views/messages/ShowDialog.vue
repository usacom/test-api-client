<template>
  <div>
    <br>
    <div v-for="item in messages" class="row no-gutters">
      <div class="col-6">From: {{users[item.idUser].nickname}}</div>
      <div class="col-6 text-right">{{item.created_at}}</div>
      <div class="pl-2">
        {{item.text}}
      </div>
      <div class="col-12">
        <hr>
      </div>
      <!--{{item}}-->
    </div>
    <div class="row no-gutters justify-content-center">
      <div class="col-12">
        <div class="form-group">
          <label>Message</label>
          <textarea class="form-control" rows="3" v-model="message"></textarea>
        </div>
      </div>
      <div class="col-4">
        <button @click="send()" class="btn btn-block btn-primary">Send</button>
      </div>
    </div>
    <br>
    <div class="row no-gutters justify-content-center">

    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        message: '',
      }
    },
    computed: {
      ...mapState({
        dialogs: state => state.messages.dialogs
      }),
      users(){
        let data = {};
        this.dialog.users.map((item)=>{
          data[item.id] = item;
        });
        return data;
      },
      dialog(){
        return this.dialogs[this.$route.params.id];
      },
      messages(){
        return this.dialogs[this.$route.params.id].messages.reverse();
      },
    },
    methods:{
      async send(){
        await this.$store.dispatch('messages/sendMessage', {id:this.$route.params.id, message: this.message});
      }
    },
  }
</script>
<style lang="scss" type="text/scss">
</style>