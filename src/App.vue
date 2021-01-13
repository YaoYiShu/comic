<template>
  <div id="app">
    <div id="nav"></div>
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
    <!-- 底部标签栏 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
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
