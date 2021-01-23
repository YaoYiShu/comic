<template>
  <div class="sort">
    <Nav :path="-1">
      <h1 slot="center" v-if="$route.query.name || $route.query.key">
        {{ $route.query.name || $route.query.key }}
      </h1>
      <div slot="right">
        <div
          class="button"
          @click.stop="
            show = !show;
            isUp = !isUp;
          "
        >
          <span
            >{{ type }}<van-icon :name="!isUp ? 'arrow-down' : 'arrow-up'"
          /></span>
        </div>
        <van-overlay :show="show" @click.stop="show = false">
          <div class="wrapper">
            <ol class="block">
              <li
                v-for="(item, index) in lists"
                :key="index"
                @click="
                  type = item.title;
                  $route.query.name ? toggleType(index) : fromSearchMsg(index);
                "
              >
                {{ item.title }}
              </li>
            </ol>
          </div>
        </van-overlay>
      </div>
    </Nav>
    <!-- 遮罩层 嵌入内容 人气、更新。。 -->
    <ul>
      <template v-if="book.length > 0">
        <li v-for="(item, index) in book" :key="index">
          <VanImage :item="item" :index="index" :score="item.score"></VanImage>
          <h3>{{ item.comic_name }}</h3>
          <p>{{ item.comic_feature }}</p>
        </li>
        <li class="app-empty-item"></li>
        <li class="app-empty-item"></li>
        <li class="app-empty-item"></li>
      </template>
      <template v-if="book.length == 0">
        <div class="none">
          <p><span class="iconfont icon-xiaoniao"></span></p>
          <p>咦？好像没有大人要的内容</p>
          <p>没关系，小编已经记录啦！</p>
        </div>
      </template>
    </ul>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import VanImage from '@/components/VanImage';
export default {
  components: {
    Nav,
    VanImage
  },
  data() {
    return {
      book: [],
      show: false,
      type: '',
      isUp: false,
      sortType: [
        { title: '人气', sort: 'click' },
        { title: '评分', sort: 'score' },
        { title: '更新', sort: 'date' }
      ],
      lists: []
    };
  },
  created() {
    if (this.$route.query.key) {
      this.fromSearchMsg(0);
    }
    if (this.$route.query.name) {
      this.getClick();
    }
  },

  methods: {
    getClick() {
      // this.$jsonp('https://api.zymk.cn/app_api/v5/getsortlist_new/', {
      //   callback: 'getsortlistNewCb&sort=click&key=&page=1'
      // }).then(res => {
      //   // console.log(res.data.page.comic_list);
      //   this.book = res.data.page.comic_list;
      // });
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      var that = this;
      this.axios
        .get(
          'https://getconfig-globalapi.zymk.cn/app_api/v5/getsortlist_top/?type=' +
            that.$route.query.id +
            '&topnum=30&client-type=android&productname=zymk&platformname=android&client-channel=store_tencent&loglevel=3&client-version=5.9.0'
        )
        .then(res => {
          // console.log(res.data.data.data);
          that.lists = res.data.data.data;
          that.book = that.lists[0].list;
          that.type = that.lists[0].title;
          that.$toast.clear();
        });
    },
    // 切换 类型
    toggleType(index) {
      this.book = this.lists[index].list;
    },
    // 从搜索页获取key 再获取数据
    fromSearchMsg(index) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      this.lists = this.sortType;
      var that = this;
      this.axios
        .get(
          'https://getconfig-globalapi.zymk.cn/app_api/v5/getsortlist_new/?key=' +
            that.$route.query.key +
            '&type=&page=1&sort=' +
            that.sortType[index].sort +
            '&client-type=android&productname=zymk&platformname=android&client-channel=store_tencent&loglevel=3&client-version=5.9.0'
        )
        .then(res => {
          // console.log(res.data.data.page.comic_list);
          this.book = res.data.data.page.comic_list;
          that.type = that.sortType[index].title;
          that.$toast.clear();
        });
    }
  }
};
</script>

<style lang="less" scoped>
.sort {
  width: 100%;
  padding: 5px 5px;
  h1 {
    color: #fff;
    font-size: 16px;
    flex: 1;
    text-align: center;
  }
  ul {
    margin-top: 50px;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    li {
      flex: 1 1 30%;
      margin: 0 5px;
      padding-bottom: 10px;
      h3 {
        height: 20px;
        font-size: 14px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      p {
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
    .app-empty-item {
      cursor: default;
      height: 0;
      margin-top: 0;
    }
    .none {
      // padding-top: 300px;
      transform: translateY(180%);
      flex-flow: column;
      align-items: center;
      font-size: 20px;
      color: #ddd;
      height: 100px;
      width: 100%;
      text-align: center;
      span {
        font-size: 64px;
      }
    }
  }
}

.button {
  color: #fff;
  font-size: 12px;
  // width: 80px;
  padding-left: 0;
  padding-right: 5px;
  display: flex;
  .van-icon {
    padding-left: 2px;
    transform: translateY(20%);
  }
}

.van-overlay {
  margin-top: 44px;
}

// 遮罩
.wrapper {
  display: flex;
  position: fixed;
  top: 50px;
  right: 10px;
  // align-items: center;
  // justify-content: center;
  // height: 100%;
}

.block {
  display: flex;
  flex-flow: column;
  width: 120px;
  // height: 120px;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 0px 3px 3px rgba(216, 216, 218, 0.6);
  li {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
