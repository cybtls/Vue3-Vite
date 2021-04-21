<template>
    <div class="home_box">
        <el-result icon="success" title="我是首页">
        </el-result>
        <div class="home-title">
            <router-link to="/articleIndex">前往文章页</router-link>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.home_box {
    .home-title {
        text-align: center;
        color: red;
    }
}
</style>
