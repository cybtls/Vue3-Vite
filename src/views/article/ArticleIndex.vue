<template>
    <div>
        <el-result icon="info" title="我是文章首页">
        </el-result>
        <el-button @click="backToIndex">返回首页</el-button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
const router = useRouter()
let backToIndex = () => {
    router.push('/')
}
</script>

<style>
* {
    text-align: center;
}
</style>
