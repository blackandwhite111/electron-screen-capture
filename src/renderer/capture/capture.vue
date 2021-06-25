<template>
    <div style="height: 500px; background: red">Capture</div>
</template>

<script>
  export default {
    name: "capture",
    data() {
      return {
        title: "首页",
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
</style>