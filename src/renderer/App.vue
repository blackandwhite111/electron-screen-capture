<template>
    <div class="app-wrap">
        <router-view></router-view>
    </div>
</template>
<script>
  import {ipcRenderer} from 'electron';

  export default {
    data() {
      return {
        title: "首页",
      };
    },
    methods: {
      add: function (e) {
        console.log(this.$route)
        ipcRenderer.send('capture', {aa: 1})
      }
    },
    created() {
      // ipcRenderer.send('capture', {bb: 22})
    }
  };
</script>
<style lang="scss">
    @import "./App.scss";
</style>