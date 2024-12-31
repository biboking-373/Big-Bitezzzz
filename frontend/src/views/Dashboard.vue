<template>
  <div class="dashboard container">
    <h1>Welcome, {{ currentUser.username }}!</h1>
    <div class="user-info">
      <p>Email: {{ currentUser.email }}</p>
      <button @click="logout" class="btn btn-danger">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    currentUser() {
      return this.$store.getters['auth/getCurrentUser'] || {}
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>