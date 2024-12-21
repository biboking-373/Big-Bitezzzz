<script>
import Navigation from './components/navigation/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
};

</script>

<template>
  <div id="app">
    
    <Navigation/>
      <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
