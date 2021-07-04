<template>
    <div class="capture-wapper">
      <div class="mask"></div>
      <canvas id="js-canvas" class="image-canvas"></canvas>
      <div id="js-toolbar"></div>
    </div>
</template>

<script>
  export default {
    name: "capture",
    data() {
      return {

      };
    },
    methods: {
      add: function (e) {
        console.log(this.$route)
      }
    },
    created() {
      console.log('run in capture')
    }
  }
</script>

<style scoped>
 * {padding: 0; margin: 0}
 .capture-wapper, .mask {
   position: absolute;
   left: 0;
   top: 0;
   bottom: 0;
   right: 0;
 }
 .mask {
   background: rgba(0,0,0,0.3);
 }
</style>