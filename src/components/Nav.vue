<template>
  <div class="nav">
    <!-- 返回 -->
    <slot name="left">
      <van-button square color="#fc6454" @click.stop="toWhere(path)">
        <span class="iconfont icon-xiangzuofanhui"></span>
      </van-button>
    </slot>

    <slot name="center"></slot>

    <!-- 搜索栏 -->
    <!-- <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      background="#fc6454"
    /> -->

    <!-- 分类栏 -->
    <!-- <van-tabs type="card" color="#fc6454">
      <van-tab
        v-for="index in 4"
        :key="index"
        :title="'index' + index"
      ></van-tab>
    </van-tabs> -->

    <!-- 点击搜索 -->
    <slot name="right">
      <van-button square color="#fc6454" to="/search" @click="handle()">
        <span class="iconfont icon-sousuo"></span>
      </van-button>
    </slot>
  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  props: ['path'],
  methods: {
    toWhere(res) {
      // console.log(res);
      if (res == '/') {
        this.$root.active = 0;
        this.$router.go(0);
      }
      if (res == '/update') {
        // this.$router.go(0);
        this.$root.active = 2;
        this.$router.go('/update');
      }
      if (res == '-1') {
        this.$router.go(-1);
      }
    },
    handle() {
      if (this.$route.path == '/search') {
        Toast({ message: '大人，请输入漫画名或 漫画家 ~。~', position: 'top' });
      }
    }
  }
};
</script>

<style lang="less">
.nav {
  display: flex;
  top: 0;
  left: 0;
  height: 44px;
  background-color: #fc6454;
  width: 100%;
  position: fixed;
  z-index: 100;
  align-items: center;
  overflow: hidden;
  .van-search {
    flex: 1;
  }
  .van-tabs {
    flex: 1;
    .van-tabs__nav {
      border-color: #fff !important;
    }
    .van-tab.van-tab--active {
      color: #fc6454 !important;
      background: #fff !important;
    }
    .van-tab {
      color: #fff !important;
      background-color: #fc6454;
      border-color: #fff !important;
    }
  }
}
</style>
