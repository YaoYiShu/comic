<template>
  <div class="type">
    <Nav :path="$route.path">
      <van-tabs
        @click="onClick"
        ref="tabs"
        type="card"
        color="#fc6454"
        slot="center"
      >
        <van-tab
          v-for="(item, index) in title"
          :key="index"
          :title="item"
        ></van-tab>
      </van-tabs>
    </Nav>

    <section v-if="comic_type.length > 0">
      <van-swipe
        class="my-swipe"
        indicator-color="white"
        :loop="false"
        ref="swipe"
        @change="onChange"
      >
        <van-swipe-item>
          <div ref="theme">
            <TypeListItem :lists="comic_type[0].data"></TypeListItem>
          </div>
        </van-swipe-item>

        <van-swipe-item>
          <div ref="proress">
            <TypeListItem ref="item" :lists="comic_type[1].data"></TypeListItem>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div ref="audiences">
            <TypeListItem :lists="comic_type[2].data"></TypeListItem>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div ref="media">
            <TypeListItem :lists="comic_type[3].data"></TypeListItem></div
        ></van-swipe-item>
      </van-swipe>
    </section>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import TypeListItem from '@/components/TypeListItem';
export default {
  components: {
    Nav,
    TypeListItem
  },
  data() {
    return {
      title: ['题材', '进度', '受众', '媒体'],
      comic_type: []
    };
  },
  created() {
    this.getType();
  },
  methods: {
    getType() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      var that = this;
      this.axios
        .get(
          'https://api.kele8.cn/agent/https://main-globalapi.zymk.cn/app_api/v5/getconfig/?client-channel=store_360&loglevel=3&client-type=android&client-version=5.4.9'
        )
        .then(res => {
          // https://main-globalapi.zymk.cn/app_api/v5/getconfig/?client-channel=store_360&loglevel=3&client-type=android&client-version=5.4.9
          // http://localhost:8080/type.json
          this.comic_type = res.data.data.comic_type;
          that.$toast.clear();
        });
    },
    // 点击标签切换
    onClick(name) {
      // console.log(name);
      this.$refs.swipe.swipeTo(name);
    },
    onChange(index) {
      this.$refs.tabs.scrollTo(index);
      // console.log(index);
      if (index == 0) {
        this.$refs.theme.style.position = 'relative';
        this.$refs.proress.style.position = 'absolute';
        this.$refs.audiences.style.position = 'absolute';
        this.$refs.media.style.position = 'absolute';
      }
      if (index == 1) {
        this.$refs.theme.style.position = 'absolute';
        this.$refs.proress.style.position = 'relative';
        this.$refs.proress.style.height = '100vh';
        this.$refs.audiences.style.position = 'absolute';
        this.$refs.media.style.position = 'absolute';
      }
    }
  }
};
</script>

<style lang="less" scoped>
.type {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
.my-swipe .van-swipe-item {
  width: 100%;
  font-size: 20px;
  text-align: center;
}
</style>
