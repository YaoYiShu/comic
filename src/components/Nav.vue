<template>
  <div class="nav">
    <!-- 返回 -->
    <van-button square color="#fc6454" to="/">返回</van-button>

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
    <van-button square color="#fc6454">搜索</van-button>
  </div>
</template>
<script>
export default {};
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
