<template>
  <div class="details-nav">
    <van-button @click="$router.push('/')">
      <span class="iconfont icon-xiangzuofanhui"></span>
    </van-button>
    <div class="right">
      <van-icon :name="!like ? 'like-o' : 'like'" @click="like = !like" />
      <van-icon name="comment-o" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      like: false
    };
  }
};
</script>

<style lang="less" scoped>
.details-nav {
  width: 100%;
  height: 44px;
  display: flex;
  position: absolute;
  z-index: 100;
  color: #fefefe;
  background-color: transparent;
  align-items: center;
  .van-button {
    background-color: transparent;
    border: none;
    color: #fefefe;
  }
  .right {
    flex: 1;
    font-size: 20px;
    line-height: 20px;
    text-align: right;
    .van-icon {
      margin-right: 30px;
    }
  }
}
</style>
