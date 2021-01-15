<template>
  <div>
    <div class="update" v-if="$root.isUpdate">
      <ul class="update-nav">
        <li
          v-for="(list, index) in update_list"
          :title="list.comicUpdateDate"
          :key="index"
        >
          <!--  :class="{ active: currentIndex == index }" -->
          <span
            :class="{ active: currentIndex == index }"
            @click="
              selected(index);
              $refs.swipe.swipeTo(index);
            "
            >{{ list.comicUpdateDate }}</span
          >
        </li>
      </ul>
      <van-swipe
        class="my-swipe"
        indicator-color="white"
        ref="swipe"
        @change="onChange"
      >
        <van-swipe-item v-for="(list, index) in update_list" :key="index">
          <div
            class="box"
            ref="item"
            :style="
              index == currentIndex
                ? 'position: relative;'
                : 'position:absolute;'
            "
          >
            <UpdateList :list="list.info"></UpdateList>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <transition
      name="cutsom-classes-transition"
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <section v-if="!$root.isUpdate">
        <Type></Type>
      </section>
    </transition>
    <transition name="van-slide-up">
      <FooterBar :toggle="toggle" :path="'update'"></FooterBar>
    </transition>
  </div>
</template>

<script>
import Type from '../views/Type';
import UpdateList from '@/components/UpdateList';
import FooterBar from '@/components/FooterBar';
export default {
  components: {
    UpdateList,
    Type,
    FooterBar
  },
  created() {
    window.addEventListener('scroll', this.handleScroll, true);
    this.getupdatecomic_list();
  },
  data() {
    return {
      update_list: [],
      toggle: true,
      isComicDetails: false,
      currentIndex: 0
      // isUpdate: true
    };
  },
  methods: {
    getupdatecomic_list() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      this.axios
        .get(
          'https://getcomicinfo-globalapi.zymk.cn/app_api/v5/getupdatecomic_list/?refreshTime=26842088&client-type=android&productname=zymk&platformname=android&client-channel=store_tencent&loglevel=3&client-version=5.9.0'
        )
        .then(res => {
          // console.log(res);
          this.update_list = res.data.data.update_list;
          this.$toast.clear();
        });
    },
    selected(index) {
      this.currentIndex = index;
    },
    onChange(index) {
      this.currentIndex = index;
      // console.log(index);
      this.$refs.item.forEach((element, index) => {
        element.style.position = 'absolute';
        if (index == this.currentIndex) {
          element.style.position = 'relative';
        }
      });
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
      } else if (scroll > 0) {
        // console.log('down');
        this.toggle = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.update {
  width: 100%;
  .update-nav {
    width: 100%;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex: 1;
      height: 44px;
      text-align: center;
      // background-color: violet;
      span {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        &.active {
          background-color: #fc6454;
          color: #fff;
        }
      }
    }
  }
  .absolute {
    position: absolute;
  }
}
.van-swipe {
  margin-top: 44px;
  .box {
    width: 100%;
  }
}
</style>
