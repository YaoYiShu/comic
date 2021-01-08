<template>
  <div id="app">
    <div id="nav"></div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 底部标签栏 -->
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar> -->
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
