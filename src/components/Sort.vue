<template>
  <div class="sort">
    <Nav :path="'/type'">
      <h1 slot="center" v-if="$route.query.name">{{ $route.query.name }}</h1>
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
                  toggleType(index);
                "
              >
                {{ item.title }}
              </li>
            </ol>
          </div>
        </van-overlay>
      </div>
    </Nav>
    <!-- <VanImage></VanImage> -->

    <!-- 遮罩层 嵌入内容 人气、更新。。 -->

    <ul>
      <li v-for="(item, index) in book" :key="index">
        <VanImage :item="item" :index="index" :score="item.score"></VanImage>
        <h3>{{ item.comic_name }}</h3>
        <p>{{ item.comic_feature }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import VanImage from '@/components/VanImage';
1;
export default {
  components: {
    Nav,
    VanImage
  },
  data() {
    return {
      book: [],
      show: false,
      type: '更新',
      isUp: false,
      lists: []
    };
  },
  created() {
    this.getClick();
  },
  methods: {
    getClick() {
      // this.$jsonp('https://api.zymk.cn/app_api/v5/getsortlist_new/', {
      //   callback: 'getsortlistNewCb&sort=click&key=&page=1'
      // }).then(res => {
      //   // console.log(res.data.page.comic_list);
      //   this.book = res.data.page.comic_list;
      // });
      var that = this;
      this.axios
        .get(
          'https://getconfig-globalapi.zymk.cn/app_api/v5/getsortlist_top/?type=' +
            that.$route.query.id +
            '&topnum=30&client-type=android&productname=zymk&platformname=android&client-channel=store_tencent&loglevel=3&client-version=5.9.0'
        )
        .then(res => {
          console.log(res.data.data.data);
          this.lists = res.data.data.data;
          this.book = this.lists[0].list;
        });
    },
    toggleType(index) {
      this.book = this.lists[index].list;
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
