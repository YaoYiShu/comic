<template>
  <!-- @scroll="scrollEvent()" -->
  <div
    class="read"
    @click.stop="
      toggle = !toggle;
      showOmit = false;
    "
    @touchstart.stop="gtouchstart()"
    @touchend.stop="gtouchend()"
  >
    <div class="mk" style="opacity: 0;"></div>
    <transition name="van-slide-down">
      <ReadNav
        v-if="chapter[0]"
        v-show="toggle"
        :chapter_name="chapter[0].chapter_name"
        :start="start"
        :end_var="chapter[0].end_var"
        @toggleOmit="showOmit = !showOmit"
      ></ReadNav>
    </transition>
    <div class="omit" v-show="showOmit && toggle">
      <span class="triangle"></span>
      <ul>
        <li
          @click.stop="
            $root.isHome = true;
            $router.push('/');
          "
        >
          <span class="iconfont icon-home"></span>首页
        </li>
        <li><span class="iconfont icon-share"></span>分享</li>
        <li><span class="iconfont icon-feedback"></span>反馈</li>
        <li><span class="iconfont icon-help"></span>帮助</li>
      </ul>
    </div>

    <!-- https://mhpic.xiaomingtaiji.net/comic/J/绝世武魂/第41话F0_298349/24.jpg-zymk.middle.webp -->
    <!-- $event.path[0].clientHeight -->
    <!-- @click.stop="test($event.path[2].children)" -->
    <div ref="imgOffsetHight">
      <van-image
        v-for="(list, index) in chapterHighUrl"
        :src="'https://mhpic.xiaomingtaiji.net/comic/' + list"
        :key="index"
      >
        <template v-slot:loading>
          <div class="loading"></div>
        </template>
      </van-image>
    </div>

    <!-- 选项 -->
    <!-- this.chapter[0] -->
    <!-- v-show="toggle" -->
    <transition name="van-slide-up">
      <van-tabbar
        class="check"
        v-show="this.chapter[0] && toggle"
        v-model="active"
        active-color="#fff"
        inactive-color="#999"
        :border="false"
      >
        <!-- 进度条 -->
        <div class="progress">
          <div class="left">
            <van-icon name="arrow-left" />
          </div>
          <van-slider
            v-model="value"
            min="1"
            active-color="#fc6454"
            inactive-color="#999"
            @change="onChange"
            @click="estop($event)"
          >
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
          <div class="right" v-if="chapter[0]">
            <span
              >{{ start == 0 ? start + 1 : start }}/{{
                chapter[0].end_var
              }}</span
            >
            <van-icon name="arrow" />
          </div>
        </div>

        <div class="check">
          <van-tabbar-item @click.stop="toggle = toggle">
            <p><span class="iconfont icon-shezhi"></span></p>
            <span>设置</span>
          </van-tabbar-item>
          <!-- 自动播放 -->
          <van-tabbar-item
            @click.stop="
              flag = !flag;
              autoPLay();
            "
          >
            <p>
              <span v-show="!flag" class="iconfont icon-play"></span>
              <span v-show="flag" class="iconfont icon-pause"></span>
            </p>
            <span>自动</span>
          </van-tabbar-item>
          <van-tabbar-item @click.stop="toggle = toggle">
            <p><span class="iconfont icon-middle"></span></p>
            <span>画质</span>
          </van-tabbar-item>
          <van-tabbar-item @click.stop="toggle = toggle">
            <p><span class="iconfont icon-light"></span></p>
            <span>亮度</span>
          </van-tabbar-item>
          <van-tabbar-item
            @click="
              toggle = toggle;
              show = !show;
            "
          >
            <p><span class="iconfont icon-mulu"></span></p>
            <span>目录</span>
          </van-tabbar-item>
        </div>
      </van-tabbar>
    </transition>
    <!--  position="top" -->
    <!-- 目录弹出层 -->
    <van-popup
      class="menu"
      v-model="show"
      position="right"
      :style="{ width: '35%', height: '100%' }"
    >
      <!-- :style="{ width: '35%', height: '100%' }" -->
      <div class="top">
        <p><span class="iconfont icon-quanji"></span>全集</p>
        <p><span class="iconfont icon-zhengxu"></span>正序</p>
      </div>
      <ul class="lists">
        <li
          v-for="(list, index) in chapter_list"
          :key="index"
          :class="{ liActive: liActive == list.chapter_id }"
          @click.stop="
            liActive = chapter_list[index].chapter_id;
            toggleChapter(list.chapter_id);
          "
        >
          {{ list.chapter_name }}
          {{ list.chapter_title }}
        </li>
      </ul>
      <div class="bottom">
        <p><span class="iconfont icon-plus"></span>添加</p>
        <p><span class="iconfont icon-shuqian"></span>书签</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import ReadNav from '@/components/ReadNav';
// import { Toast } from 'vant';
export default {
  components: {
    ReadNav
  },
  data() {
    return {
      active: 0,
      liActive: this.$route.query.chapter_id,
      toggle: true,
      i: 0,
      value: 1,
      scrollTop: null,
      flag: false,
      show: false,
      showOmit: false,
      start: 1,
      chapter_id: this.$route.query.chapter_id,
      comicChapterRecord: localStorage.comicChapterRecord
        ? JSON.parse(localStorage.comicChapterRecord)
        : []
    };
  },
  mounted() {
    this.$store.dispatch('getChapter_addr', this.$route.query.id);
    // 监听滚轮滚动
    window.addEventListener('scroll', this.handleScroll, true);
    this.timer2 = setTimeout(() => {
      this.toggle = false;
    }, 5000);
  },
  activated() {
    this.$store.dispatch('getChapter_addr', this.$route.query.id);
  },
  computed: {
    chapter: {
      // console.log(this.$route.query.chapter_id);
      get() {
        return this.$store.state.chapter.filter(item => {
          return item.chapter_id == this.chapter_id;
        });
      },
      set(newValue) {
        console.log(newValue);
        this.chapter_id = newValue[0].chapter_id;
        // this.$route.query.chapter_id = newValue[0].chapter_id;
        this.$router.push({
          path: '/read',
          query: {
            id: this.$route.query.id,
            chapter_id: newValue[0].chapter_id
          }
        });
        this.comicChapterRecord = this.comicChapterRecord.filter(item => {
          return item.id != this.$route.query.id;
        });

        this.comicChapterRecord.push({
          id: this.$route.query.id,
          chapter_id: newValue[0].chapter_id,
          chapter_name: newValue[0].chapter_name
        });
        localStorage.comicChapterRecord = JSON.stringify(
          this.comicChapterRecord
        );

        this.$router.go(0);
      }
    },
    chapter_list() {
      return this.$store.state.chapter;
      // .map(item => {
      //   return item.chapter_name;
      // });
    },
    chapterHighUrl() {
      let chapterList = [];
      let url;
      if (this.chapter[0]) {
        for (let i = 1; i <= this.chapter[0].end_var; i++) {
          url = this.chapter[0].chapter_addr + i + '.jpg-zymk.high.webp';
          chapterList.push(url);
        }
      }
      return chapterList;
    },
    chapterMiddleUrl() {
      let chapterList = [];
      let url;
      if (this.chapter[0]) {
        for (let i = 1; i <= this.chapter[0].end_var; i++) {
          url = this.chapter[0].chapter_addr + i + '.jpg-zymk.middle.webp';
          chapterList.push(url);
        }
      }
      return chapterList;
    },
    chapterLowUrl() {
      let chapterList = [];
      let url;
      if (this.chapter[0]) {
        for (let i = 1; i <= this.chapter[0].end_var; i++) {
          url = this.chapter[0].chapter_addr + i + '.jpg-zymk.low.webp';
          chapterList.push(url);
        }
      }
      return chapterList;
    }
  },
  methods: {
    text() {
      console.log(1);
    },
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
      } else if (scroll > 0 && this.flag == false) {
        // console.log('down');
        this.toggle = false;
      }
    },
    autoPLay() {
      // console.log(this.$refs.imgOffsetHight.offsetHeight);
      this.timer2 ? clearTimeout(this.timer2) : null;
      // console.log(this.flag);
      if (this.flag) {
        if (this.scrollTop < this.$refs.imgOffsetHight.offsetHeight) {
          this.timer = setInterval(() => {
            this.scrollTop = this.scrollTop + 1;
            // console.log(this.scrollTop);
            document.body.scrollTo({ top: this.scrollTop, behavior: 'smooth' });
          }, 50);
        }
      } else {
        clearInterval(this.timer);
      }
      this.timer2 = setTimeout(() => {
        this.toggle = false;
      }, 5000);
    },
    gtouchstart() {
      this.timer2 ? clearTimeout(this.timer2) : null;
      // console.log('gtouchstart 按下');
      if (this.flag) {
        clearInterval(this.timer);
      }
      this.timer2 = setTimeout(() => {
        // console.log('timer2', 1);
        this.toggle = false;
        this.showOmit = false;
      }, 5000);
    },
    gtouchend() {
      // console.log('松开了');
      if (this.flag) {
        this.timer = setInterval(() => {
          this.scrollTop = this.scrollTop + 1;
          // console.log(this.scrollTop);
          document.body.scrollTo({ top: this.scrollTop, behavior: 'smooth' });
        }, 50);
      }
    },
    onChange(value) {
      // Toast(value);
      // console.log(value);
      if (value > 0) {
        this.start = parseInt((value / 100) * this.chapter[0].end_var);
        let res = (value / 100) * this.$refs.imgOffsetHight.offsetHeight;
        document.body.scrollTo({ top: res, behavior: 'smooth' });
      }
    },
    toggleChapter(id) {
      this.chapter = this.$store.state.chapter.filter(item => {
        return item.chapter_id == id;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.van-hairline--top-bottom,
.van-tabbar,
.van-tabbar--fixed {
  display: flex;
  flex-flow: column;
  height: 140px;
  background-color: rgba(0, 0, 0, 0.8);
  .progress {
    height: 30px;
    align-items: center;
    display: flex;
    .van-icon {
      font-size: 14px;
      color: #999;
    }
    .left {
      width: 90px;
      text-align: center;
      transform: translateY(30%);
    }
    .van-slider {
      width: 100%;
      margin-top: 10px;
    }
    div.right {
      height: 14px;
      line-height: 1em;
      font-size: 14px;
      width: 110px;
      padding-left: 20px;
      transform: translateY(30%);
      span {
        color: #fefefe;
        display: inline-block;
        transform: translateY(-2px);
        padding-right: 10px;
      }
    }
  }
  .check {
    position: fixed;
    bottom: 30px;
    left: 0;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    .van-tabbar-item {
      flex: 1 1 20%;
      height: 100%;
    }
  }
}
.van-tabbar-item {
  background-color: transparent !important;
  span {
    font-size: 14px;
    display: inline-block;
  }
  p {
    text-align: center;
    span.iconfont {
      margin-bottom: 10px;
      font-size: 28px;
    }
  }
}
.custom-button {
  width: 14px;
  height: 14px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #fc6454;
  border-radius: 50%;
}
.mk {
  width: 100%;
  position: absolute;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  z-index: -1;
}
.omit {
  position: absolute;
  z-index: 10;
  width: 100px;
  height: auto;
  top: 64px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  .triangle {
    position: absolute;
    top: -15px;
    right: 15px;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 15px solid rgba(0, 0, 0, 0.8);
    // background-color: rgba(0, 0, 0, 0.8);
    display: inline-block;
  }
  li {
    color: #fff;
    height: 40px;
    line-height: 40px;
    // text-align: center;
    .iconfont {
      font-size: 20px;
      padding: 0 25px 0 10px;
      transform: translateY(25%);
    }
  }
}
.van-popup.menu {
  background-color: transparent;
  .top,
  .bottom {
    display: flex;
    color: #fff;
    // text-align: center;
    p {
      height: 30px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.8);
    }
    .iconfont {
      font-size: 18px;
      margin-right: 5px;
      &.icon-zhengxu,
      &.icon-shuqian {
        font-size: 16px;
      }
    }
  }
  .lists {
    background-color: rgba(0, 0, 0, 0.4);
    li {
      text-indent: 1em;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      white-space: nowrap;
      color: #f5f5f5;
      text-overflow: ellipsis;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .liActive {
      background-color: #fc6454;
    }
  }
}
</style>
