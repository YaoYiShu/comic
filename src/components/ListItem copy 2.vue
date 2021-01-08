<template>
  <div class="list-item">
    <div class="hd">
      <div class="main">
        <!-- 背景图标 -->
        <i
          class="icon"
          :class="'icon-' + (index < 6 ? index + 1 : index % 6)"
        ></i>
        <!-- 独家、经典。。。 -->
        <h2>
          {{ book.title | formatBookTitle }}
        </h2>
        <van-button icon="plus" size="mini" round>更多</van-button>
        <!-- 私人定制 -->
        <!-- <p class="summary"></p> -->
      </div>
    </div>
    <!-- 轮播 -->
    <!-- :width="115" -->
    <van-swipe class="my-swipe reset-swipe" :show-indicators="false">
      <van-swipe-item v-for="(item, index) in comic_id" :key="index">
        <van-grid :gutter="10">
          <div style="border-radius:5px">
            <van-image
              :src="
                'https://image.zymkcdn.com/file/cover/000/00' + item + '.jpg'
              "
            />
          </div>
          <p class="comic_name">
            {{ book.comic_info[index].comic_name }}
          </p>
          <p class="content">{{ book.comic_info[index].content }}</p>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: ['book', 'index'],
  data() {
    return {
      comic_info: [],
      index_title: 1
    };
  },
  filters: {
    formatBookTitle(value) {
      if (!value) return '';
      value = value.toString();
      if (value.substr(0, 1) != '「' && value.substr(0, 1) != '【') {
        return '【' + value + '】';
      } else {
        return value;
      }
    }
  },
  created() {
    this.comic_info = this.book.comic_info;
    // console.log(this.book);
  },
  computed: {
    comic_id() {
      return this.comic_info.map(item => {
        if (item.comic_id.toString().length == 4) {
          return (
            item.comic_id.toString().substr(0, 1) +
            '/' +
            item.comic_id.toString().substr(1, item.comic_id.length)
          );
        } else if (item.comic_id.toString().length == 1) {
          return '0/00' + item.comic_id;
        } else if (item.comic_id.toString().length == 3) {
          return '0/' + item.comic_id;
        } else if (item.comic_id.toString().length == 2) {
          return '0/0' + item.comic_id;
        }
      });
    }
  },
  methods: {
    handle() {
      this.index_title = this.index_title + 1;
      return this.index_title;
    }
  }
};
</script>

<style lang="less" scoped>
@import url('../styles/resetvant.less');
.list-item {
  border: 1px solid #f5f5f5;
  padding: 10px 0;
  margin-bottom: 10px;
  background: #fff;
  .main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 10px;
    .icon {
      width: 30px;
      height: 26px;
      background: url('../assets/images/index_title.png') no-repeat;
      background-repeat: no-repeat;
      background-size: 0.800008rem 4.4800448rem;
    }
    .icon-1 {
      background-position: 2px -5px;
    }
    .icon-2 {
      background-position: 0 -30px;
    }
    .icon-3 {
      background-position: 0 -60px;
    }
    .icon-4 {
      background-position: 0 -90px;
    }
    .icon-5 {
      background-position: 0 -120px;
    }
    .icon-6 {
      background-position: 0 -140px;
    }
    h2 {
      flex: 1;
      font-size: 14px;
      height: 28px;
      line-height: 32px;
      white-space: pre-line;
    }
    .van-button {
      max-height: 20px;
      color: #999;
      .van-button__icon {
        &::before {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          background: url('../assets/images/more.png') no-repeat;
          background-size: cover;
        }
      }
    }
  }

  .van-image__img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 5px !important;
  }

  .my-swipe {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    .van-swipe-item {
      .van-grid {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .comic_name {
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .content {
      font-size: 12px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
}
</style>
