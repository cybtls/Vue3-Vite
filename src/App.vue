<template>
    <router-view />
</template>

<script setup>
import { inject } from 'vue'
const http = inject('$http')
console.log(http.getUserInfo())
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
