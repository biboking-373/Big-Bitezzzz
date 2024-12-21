<script>
import Navigation from './components/Navigation/Navigation.vue'
import Footer from './components/FOOTER/footer.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
  },
};
</script>

<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <Navigation />
    <main class="flex-grow-1 mt-5 pt-5">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
#app {
  padding-bottom: 60px; /* Ensures content doesn't get hidden behind footer */
}
</style>