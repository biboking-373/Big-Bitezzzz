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
    <main class="flex-grow-1 container mt-5 pt-4">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color:rgb(236, 233, 233);
  width:100%;
}

main {
  flex: 1 0 auto;
}
</style>