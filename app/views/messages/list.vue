<template>
  <div>
    <router-link :to="{ name: 'deposit-details', params: { id: item.id }}" v-for="item in list">
      <div class="row no-gutters">
        <div class="col-6">{{item.name}}</div>
        <div class="col-6 text-right">{{item.updated_at}}</div>
      </div>
      <hr class="mb-0">
    </router-link>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        list: state => state.messages.list
      }),
    },
  }
</script>
<style lang="scss" type="text/scss">
</style>