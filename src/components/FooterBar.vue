<template>
  <van-tabbar v-if="toggle" v-model="active">
    <van-tabbar-item
      icon="home-o"
      @click="
        $router.go(0);
        active = 0;
      "
      >首页</van-tabbar-item
    >
    <van-tabbar-item icon="search" @click.stop="$emit('toggleType')"
      >分类</van-tabbar-item
    >
    <van-tabbar-item icon="friends-o">更新</van-tabbar-item>
    <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  props: ['toggle', 'isHome']
};
</script>

<style></style>
