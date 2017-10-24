<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <div class="collapse navbar-collapse container">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{name: 'home'}" class="nav-link">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'settings'}" class="nav-link">
              Settings profile
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'friendsList'}" class="nav-link">
              Friends
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'searchPeople'}" class="nav-link">
              People search
            </router-link>
          </li>
        </ul>

      </div>
    </nav>
    <router-view class="container"></router-view>
  </div>
</template>
<script>
  export default {

  }
</script>
