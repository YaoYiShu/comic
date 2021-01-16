<template>
  <div id="app">
    <router-view></router-view>
    <!-- 底部标签栏 -->
  </div>
</template>
<script>
export default {
  watch: {
    $route(to) {
      // console.log(to, from);
      if (to.path == '/update') {
        this.$root.active = 2;
        if (!this.$root.isUpdate) {
          this.$root.active = 1;
        }
      }
      if (to.path == '/') {
        this.$root.active = 0;
        if (!this.$root.isHome) {
          this.$root.active = 1;
        }
      }
      if (to.path == '/about') {
        this.$root.active = 3;
      }
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  width: 100%;
  height: 100%;
  // overflow-x: scroll;
  overflow: scroll;
  /* overflow-y: hidden; */
  &::-webkit-scrollbar {
    display: none;
  }
}
// html::-webkit-scrollbar,
// body::-webkit-scrollbar {
// }
</style>
