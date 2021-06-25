<template>
    <div>
        <div class="tools-bar">
            <el-row>
                <router-link to="/home"><el-button icon="el-icon-s-home" circle></el-button></router-link>
            </el-row>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: "homeFunctions"
  }
</script>

<style scoped>
    .tools-bar {
        padding: 10px 10px;
        background: #eee;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
    }
</style>