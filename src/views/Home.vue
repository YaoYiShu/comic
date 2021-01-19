<template>
  <div>
    <div class="home" v-if="$root.isHome">
      <template>
        <header>
          <!-- 导航条 -->
          <router-link to="/search" class="search">
            <span class="iconfont icon-sousuo"></span>
          </router-link>
          <!-- 轮播 -->
          <van-swipe
            class="my-swipe"
            :autoplay="3000"
            indicator-color="#fc6454"
            v-if="slideListID"
          >
            <van-swipe-item
              v-for="(item, index) in slideList"
              :key="index"
              :style="
                'background-image:url(https://image.zymkcdn.com/file/news/000/004/' +
                  slideListID[index] +
                  '.jpg)'
              "
              @click="
                !isComicDetails
                  ? $router.push({
                      path: '/comicDetails',
                      query: { id: item.comic_id }
                    })
                  : ''
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
    </div>
    <transition
      name="cutsom-classes-transition"
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <section v-if="!$root.isHome">
        <Type></Type>
      </section>
    </transition>
    <transition name="van-slide-up">
      <FooterBar :toggle="toggle" :path="'home'"></FooterBar>
    </transition>
  </div>
</template>

<script>
import FooterBar from '@/components/FooterBar';
import ComicList from '@/components/ComicList';
import Type from '../views/Type';
export default {
  name: 'Home',
  components: {
    ComicList,
    Type,
    FooterBar
  },
  data() {
    return {
      toggle: true,
      isHome: true,
      isComicDetails: false
    };
  },
  created() {
    this.$store.dispatch('slideListAsync');
    window.addEventListener('scroll', this.handleScroll, true);
  },
  computed: {
    slideListID() {
      if (localStorage.slideList) {
        return JSON.parse(localStorage.slideList).map(item => {
          return item.id.toString().substr(1);
        });
      } else {
        return this.$store.state.slideList.map(item => {
          return item.id.toString().substr(1);
        });
      }
    },
    slideList() {
      if (localStorage.slideList) {
        return JSON.parse(localStorage.slideList);
      } else {
        return this.$store.state.slideList;
      }
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
    // width: 100%;
    position: relative;
    .search {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      position: absolute;
      top: 15px;
      right: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.6);
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
        background-color: rgba(0, 0, 0, 0.4);
        width: 100%;
        color: #fff;
        font-size: 20px;
        height: 52vw;
        text-align: center;
        box-sizing: border-box;
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
