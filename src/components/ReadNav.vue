<template>
  <div class="read-nav">
    <van-button
      @click="
        $router.push({
          path: '/ComicDetails',
          query: { id: $route.query.id }
        })
      "
    >
      <!-- xiangzuofanhui -->
      <span class="iconfont icon-xiangzuofanhui"></span>
    </van-button>
    <span
      >{{ chapter_name }}
      <i>{{ start == 0 ? start + 1 : start }}/{{ end_var }}</i></span
    >
    <van-icon name="ellipsis" @click.stop="$emit('toggleOmit')" />
  </div>
</template>

<script>
export default {
  props: ['chapter_name', 'end_var', 'start']
};
</script>

<style lang="less" scoped>
.read-nav {
  color: #fefefe;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
  .van-button {
    background-color: transparent;
    border: none;
    color: #fefefe;
  }
  span {
    font-size: 18px;
    text-align: center;
    flex: 1;
    i {
      font-style: normal;
      font-size: 16px;
    }
  }
  .van-icon {
    float: right;
    width: 30px;
    font-size: 20px;
    // padding: 0 10px;
  }
}
</style>
