<template>
  <div class="home">
    <template v-if="!isType">
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
    </template>

    <transition
      name="cutsom-classes-transition"
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <section v-if="isType">
        <Type></Type>
      </section>
    </transition>

    <transition name="van-slide-up">
      <FooterBar
        :toggle="toggle"
        @toggleType="isType = true"
        :isHome="isHome"
      ></FooterBar>
    </transition>
  </div>
</template>

<script>
import ComicList from '@/components/ComicList';
import FooterBar from '@/components/FooterBar';
import Type from '../views/Type';
export default {
  name: 'Home',
  components: {
    ComicList,
    FooterBar,
    Type
  },
  data() {
    return {
      isHome: true,
      toggle: true,
      isType: false
    };
  },
  created() {
    console.log(this.isType);
    window.addEventListener('scroll', this.handleScroll, true);
    this.timer2 = setTimeout(() => {
      this.toggle = false;
    }, 5000);
    this.$store.dispatch('slideListAsync');
  },
  computed: {
    slideListID() {
      return this.$store.state.slideList.map(item => {
        return item.id.toString().substr(1);
      });
    },
    slideList() {
      // if (localStorage.slideList) {
      //   return JSON.parse(localStorage.slideList);
      // } else {
      return this.$store.state.slideList;
      // }
    }
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      let scroll = this.scrollTop - this.i;
      this.i = this.scrollTop;
      if (scroll < 0) {
        // console.log('up');
        this.toggle = true;
      } else if (scroll > 0) {
        // console.log('down');
        this.toggle = false;
      }
    }
  }
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
