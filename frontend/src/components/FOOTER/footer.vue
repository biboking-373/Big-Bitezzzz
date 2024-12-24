<script>
export default {
name: 'Footer',
data() {
    return {
    currentYear: new Date().getFullYear()
    }
}
}
</script>

<template>
<footer class="footer py-3 border-top mt-auto" style="background-color:mediumslateblue;">
    <div class="container">
    <div class="row text-center">
        <div class="col-12 mb-2">
        <router-link to="/about" class="text-decoration-none" style="color:white" >
            About
        </router-link>
        </div>
        <div class="col-12">
        <small class="" style="color:white">
            © {{ currentYear }} Big Bitezzz. All rights reserved.
        </small>
        </div>
    </div>
    </div>
</footer>
</template>

<style scoped>

</style>