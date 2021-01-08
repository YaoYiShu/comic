<template>
  <div class="home">
    <header>
      <!-- 导航条 -->
      <router-link to="/search" class="search">
        <span class="iconfont icon-sousuo"></span>
      </router-link>

      <!-- 轮播 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#fc6454">
        <van-swipe-item
          v-for="(item, index) in slideList"
          :key="index"
          :style="
            'background-image:url(https://image.zymkcdn.com/file/news/000/004/' +
              slideListID[index] +
              '.jpg)'
          "
        >
          <!-- title 左下标题-->
          <div class="title">{{ item.slide_desc }}</div>
        </van-swipe-item>
      </van-swipe>
    </header>
    <!-- 主要内容：独家、经典、霸总 -->
    <section>
      <ComicList :isHome="true"></ComicList>
    </section>
    <!--  -->
  </div>
</template>

<script>
import ComicList from '@/components/ComicList';
export default {
  name: 'Home',
  components: {
    ComicList
  },
  data() {
    return {
      isHome: true
    };
  },
  mounted() {
    this.$store.dispatch('slideListAsync');
  },
  computed: {
    slideListID() {
      return this.$store.state.slideList.map(item => {
        return item.id.toString().substr(1);
      });
    },
    slideList() {
      return this.$store.state.slideList;
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.home {
  background: #f5f5f5;
  header {
    width: 100%;
    .search {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      position: absolute;
      top: 15px;
      right: 15px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 49;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 22px;
      }
    }
    .my-swipe {
      .van-swipe-item {
        width: 100%;
        color: #fff;
        font-size: 20px;
        height: 52vw;
        text-align: center;
        box-sizing: border-box;
        // background-image: url('../assets/images/423.jpg');
        background-color: #39a9ed;
        background-size: 100%;
        background-position: 0;
      }
      .title {
        font-size: 12px;
        position: absolute;
        bottom: 10px;
        left: 10px;
      }
    }
  }
}
</style>
