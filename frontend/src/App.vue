<script>
export default {
  name: 'App'
}
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <div class="container d-flex justify-content-center align-items-center">
          <img src="/BIG BITEZZZ.png" alt="Home page image"
          class="rounded-circle overflow-hidden" style="width:90px; height:90px">
          </div>
        </router-link>
        <div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link to="/tutorials" class="nav-item nav-link">Recipes</router-link>
          <router-link to="/bookmarks" class="nav-item nav-link">My Bookmarks</router-link>
          <router-link to="/login" class="nav-item nav-link">Login</router-link>
          <router-link to="/register" class="nav-item nav-link">Register</router-link>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
}
</style>
