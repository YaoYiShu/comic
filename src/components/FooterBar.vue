<template>
  <van-tabbar v-if="toggle" v-model="$root.active">
    <van-tabbar-item
      icon="home-o"
      @click.stop="
        handle(path);
        $root.isHome = true;
        $root.active = 0;
      "
      >首页</van-tabbar-item
    >
    <!-- @click.stop="
        isHome ? $router.go(0) : $router.push('/');
        active = 0;
      " -->
    <!-- $router.push('/type'); -->
    <!-- $parent.isHome = false; -->
    <van-tabbar-item
      icon="search"
      @click.stop="
        $root.isUpdate = false;
        $root.isHome = false;
        $root.isAbout = false;
        $root.active = 1;
      "
      >分类</van-tabbar-item
    >
    <van-tabbar-item
      icon="friends-o"
      @click.stop="
        $router.push('/update');
        $root.isUpdate = true;
        $root.active = 2;
      "
      >更新</van-tabbar-item
    >
    <van-tabbar-item
      icon="setting-o"
      @click.stop="
        $router.push('/about');
        $root.isAbout = true;
      "
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
export default {
  props: ['toggle', 'path'],
  methods: {
    handle(res) {
      if (res == 'home') {
        this.$router.go(0);
      }
      if (res == 'update') {
        this.$router.push('/');
      }
      if (res == 'about') {
        this.$router.push('/');
      }
    }
  }
};
</script>
