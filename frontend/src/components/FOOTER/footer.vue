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
<footer class="footer py-3 bg-info-subtle border-top mt-auto">
    <div class="container">
    <div class="row text-center">
        <div class="col-12 mb-2">
        <router-link to="/about" class="text-decoration-none text-secondary">
            About
        </router-link>
        </div>
        <div class="col-12">
        <small class="text-muted">
            © {{ currentYear }} Big Bitezzz. All rights reserved.
        </small>
        </div>
    </div>
    </div>
</footer>
</template>

<style scoped>

</style>