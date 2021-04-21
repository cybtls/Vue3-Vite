<template>
    <router-view></router-view>
</template>

<script setup>
import { inject } from 'vue'
const http = inject('$http')
http.getUserInfo()
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
