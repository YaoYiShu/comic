<template>
  <div class="details-nav">
    <div class="box" :style="{ opacity: opacity }">
      <van-button @click.stop="toWhere(path)">
        <span class="iconfont icon-xiangzuofanhui"></span>
      </van-button>
      <h3>{{ name }}</h3>
      <div class="box-right">
        <van-icon :name="!like ? 'like-o' : 'like'" @click="like = !like" />
        <van-icon name="comment-o" />
      </div>
    </div>

    <van-button @click="toWhere(path)">
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
  props: ['name', 'path'],
  created() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  data() {
    return {
      like: false,
      opacity: 0
    };
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (scrollTop > 50) {
        this.opacity = this.opacity + 0.2;
      } else {
        this.opacity = this.opacity - 0.2;
      }

      if (scrollTop == 0) {
        this.opacity = 0;
      }
    },
    toWhere(path) {
      if (path == '/read') {
        this.$router.push('/');
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.details-nav {
  width: 100%;
  height: 44px;
  display: flex;
  // position: fixed;
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
      margin-right: 10px;
    }
  }
}
.box {
  display: flex;
  width: 100%;
  height: 50px;
  position: fixed;
  background-color: #fff;
  color: #fc6454;
  justify-content: center;
  align-items: center;
  span.iconfont {
    color: #fc6454;
  }
  h3 {
    text-align: center;
    font-size: 18px;
    flex: 1;
  }
  .box-right {
    line-height: 44px;
    transform: translateY(10%);
    color: #fc6454;
    i {
      font-size: 20px;
      padding-right: 10px;
      transform: translateY(10%);
    }
  }
}
</style>
