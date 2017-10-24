<template>
  <div>
    <!--{{profile}}-->
    <ul class="list-group" v-if="profileOr != null">
      <li class="list-group-item">
        nickname: {{profileOr['nickname']}}
      </li>
      <li class="list-group-item">
        email: {{profileOr['email']}}
      </li>
      <li class="list-group-item">
        <div class="form-group">
          <label>Name: {{profileOr['name']}}</label>
          <input type="text" class="form-control" v-model="profile['name']">
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-group">
          <label>Last name: {{profileOr['last_name']}} </label>
          <input type="text" class="form-control" v-model="profile['last_name']">
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-group">
          <label>Phone: {{profileOr['phone']}}</label>
          <input type="text" class="form-control" v-model="profile['phone']">
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-group">
          <label>Birthday: {{profileOr['birthday']}}</label>
          <input type="date" class="form-control" v-model="profile['birthday']">
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-group">
          <label>Gender: {{profileOr['gender']}}</label>
          <f-dropdown :value="profile.gender" :items="['man', 'woman']" :itemLabel="genderLabel" @input="genderSelect"></f-dropdown>
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-group">
          <label>Job: {{profileOr['job']}}</label>
          <input type="text" class="form-control" v-model="profile['job']">
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-group">
          <label>Length: {{profileOr['length']}}</label>
          <input type="text" class="form-control" v-model="profile['length']">
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-group">
          <label>Weight: {{profileOr['weight']}}</label>
          <input type="text" class="form-control" v-model="profile['weight']">
        </div>
      </li>
      <!--<li class="list-group-item">-->
        <!--<img :src="'http://band2.dev/api/file/open?name='+profile['avatar']" style="width: 100%"/>-->
        <!--Avatar: {{profile['avatar']}}-->
      <!--</li>-->
    </ul>
    <button class="btn btn-primary btn-block" @click="save()">Save</button>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  const _ = require('lodash');
  export default {
    mounted(){
//      this.$store.dispatch('user/loadProfile');
//      this.profile = _.clone(this.profileOr);
    },
    data () {
      return {
        login: 'usa_com',
        password: 'test500500',
        profile: {
          name: '',
          last_name: '',
          phone: '',
          birthday: '',
          job: '',
          gender: '',
          length: '',
          weight: ''
        },
      }
    },
    methods:{
      async save(){
        await this.$store.dispatch('user/saveProfile', this.profile);
      },
      genderLabel(item, isToggle){
        return item
      },
      genderSelect(item){
        console.log(item);
        this.profile.gender = item;
      }
    },
    computed: {
      profileOr(){
          return this.$store.state.user.profile;
      },
//      ...mapState({
//        profileOr: state => state.user.profile
//      }),
    }
  }
</script>
