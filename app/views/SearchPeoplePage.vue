<template>
  <div>
    <div class="row no-gutters">
      <div class="col-12 form-group">
        <label>Nickname</label>
        <input type="text" class="form-control" aria-describedby="Nickname" placeholder="Nickname" v-model="nickname">
      </div>
      <div class="col-12 form-group">
        <label>Name</label>
        <input type="text" class="form-control" aria-describedby="Name" placeholder="Name" v-model="name">
      </div>
      <div class="col-12 form-group">
        <label>Last name</label>
        <input type="text" class="form-control" aria-describedby="Last name" placeholder="Last name" v-model="last_name">
      </div>
      <div class="col-6 form-group pr-1">
        <label>Birthday or birthday min</label>
        <input type="date" class="form-control" aria-describedby="Birthday" placeholder="Birthday" v-model="birthday">
      </div>
      <div class="col-6 form-group pl-1">
        <label>Birthday max</label>
        <input type="date" class="form-control" aria-describedby="Last name" placeholder="Last name" v-model="birthday_max">
      </div>
      <div class="col-4 form-group pl-1">
        <label>Birthday year</label>
        <input type="number" class="form-control" aria-describedby="Birthday Year" placeholder="Birthday Year" v-model="birthdayY">
      </div>
      <div class="col-4 form-group pr-1 pl-1">
        <label>Birthday month</label>
        <input type="number" class="form-control" aria-describedby="Birthday month" placeholder="Birthday month" v-model="birthdayM">
      </div>
      <div class="col-4 form-group pr-1">
        <label>Birthday day</label>
        <input type="number" class="form-control" aria-describedby="Birthday day" placeholder="Birthday day" v-model="birthdayD">
      </div>

      <div class="col-6 form-group pr-1">
        <label>Length or length min</label>
        <input type="number" class="form-control" aria-describedby="Length" placeholder="Length" v-model="length">
      </div>
      <div class="col-6 form-group pl-1">
        <label>Length max</label>
        <input type="number" class="form-control" aria-describedby="Length max" placeholder="Length max" v-model="length_max">
      </div>
      <div class="col-6 form-group pr-1">
        <label>Weight or weight min</label>
        <input type="number" class="form-control" aria-describedby="Weight" placeholder="Weight" v-model="weight">
      </div>
      <div class="col-6 form-group pl-1">
        <label>Weight max</label>
        <input type="number" class="form-control" aria-describedby="Weight max" placeholder="Weight max" v-model="weight_max">
      </div>
      <div class="col-12 form-group">
        <label for="genderSelector">Gender</label>
        <select class="form-control" id="genderSelector" v-model="gender">
          <option value="">null</option>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
      </div>
      <div class="col-12">
        <button type="button" class="btn btn-primary btn-block" @click="search()">Search</button>
      </div>
    </div>
    <br>
    <nav v-if="result != null && result['countPage']>1">
      <ul class="pagination justify-content-center">
        <li v-for="i in result['countPage']" :class="['page-item', {'active':(activePage == i)}]"><button type="button" class="page-link" @click="search(i)">{{i}}</button></li>
      </ul>
    </nav>
    <div v-if="result!=null">
      <div class="row" v-for="item in result['page']" v-if="item['id'] !== profile.id">
        <div class="col-12 col-md-2">
          <img v-if="item['avatar']" :src="'http://band2.dev/api/file/open?name='+item['avatar']" style="width: 100%"/>
        </div>
        <div class="col-12 pl-0 pl-md-2 col-md-8">
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
        <div class="col-12">
          status:  <span v-if="friendList[item['id']]!= undefined"> your friend</span>
        </div>
        <div class="col-12">
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        nickname: '',
        name: '',
        last_name: '',
        birthdayY: '',
        birthdayM: '',
        birthdayD: '',
        gender: '',
        length: '',
        length_max: '',
        weight: '',
        weight_max: '',
        birthday: '',
        birthday_max: '',

        activePage: 1,
        result: null
      }
    },
    async mounted(){
      this.$store.dispatch('friend/loadFriends');
      this.result = await this.$store.dispatch('friend/search', {});
    },
    computed: {
      ...mapState({
        token: state => state.user.token,
        profile: state => state.user.profile,
      }),
      friendList(){
        let friendList = this.$store.state.friend.friendList;
        let newData = {};
        for(let i = 0; i < friendList.length; i++){
          newData[friendList[i].id] = friendList[i];
        }
        return newData;
      }
    },
    methods:{
      async search(page = null){
        let data = {
          nickname: this.nickname,
          name: this.name,
          last_name: this.last_name,
          birthdayY: this.birthdayY,
          birthdayM: this.birthdayM,
          birthdayD: this.birthdayD,
          gender: this.gender,
          length: this.length,
          length_max: this.length_max,
          weight: this.weight,
          weight_max: this.weight_max,
          birthday: this.birthday,
          birthday_max: this.birthday_max,
        };
        if(page != null){
          data['numberPage'] = page;
          this.activePage = page;
        }
        this.result = await this.$store.dispatch('friend/search', data);
      }
    }
  }
</script>
