<template>
    <div>
<!--      <el-menu-->
<!--          :default-active="activeIndex2"-->
<!--          class="el-menu-demo"-->
<!--          mode="horizontal"-->
<!--          @select="handleSelect"-->
<!--          background-color="#545c64"-->
<!--          text-color="#fff"-->
<!--          active-text-color="#ffd04b">-->
<!--        <el-menu-item index="1"><router-link tag="span" to="/home">返回首页</router-link></el-menu-item>-->
<!--      </el-menu>-->
        <div class="tools-bar">
            <el-row>
                <router-link to="/home"><el-button icon="el-icon-s-home" circle></el-button></router-link>
            </el-row>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { ipcMain, ipcRenderer } from 'electron';
  export default {
    name: "homeFunctions",
    data() {
      return {
        // activeIndex: '1',
        // activeIndex2: '1'
      };
    },
    methods: {
      // handleSelect(key, keyPath) {
      //   console.log(key, keyPath);
      // }
    }
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