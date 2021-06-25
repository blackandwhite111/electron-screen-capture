<template>
    <div class="home">
        <div class="home_title"><el-tag>功能列表</el-tag></div>
        <el-button type="primary" @click="toRouter('/homeFunctions/funCapture')">截屏识别文字</el-button>
    </div>
</template>

<script>
  export default {
    name: "home",
    methods: {
      toRouter(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped>
    .home {
        text-align: center;
    }
    .home_title {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>