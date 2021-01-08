<template>
  <div class="list-item">
    <div class="hd">
      <div class="main">
        <!-- 背景图标 -->
        <i class="icon"></i>
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
    <van-swipe
      class="my-swipe reset-swipe"
      :width="115"
      :show-indicators="false"
    >
      <van-swipe-item v-for="(item, index) in comic_id" :key="index">
        <van-grid :gutter="10">
          <div style="border-radius:5px">
            <van-image
              :src="
                'https://image.zymkcdn.com/file/cover/000/00' + item + '.jpg'
              "
            />
          </div>
          <p class="comic_name">{{ book.comic_info[index].comic_name }}</p>
          <p class="content">{{ book.comic_info[index].content }}</p>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: ['book'],
  data() {
    return {
      comic_info: []
    };
  },
  filters: {
    formatBookTitle(value) {
      if (!value) return '';
      value = value.toString();
      return value;
    }
  },
  created() {
    this.comic_info = this.book.comic_info;
    console.log(this.book);
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
  }
};
</script>

<style lang="less" scoped>
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
    h2 {
      flex: 1;
      font-size: 12px;
      height: 32px;
      line-height: 32px;
    }
    .van-button {
      max-height: 20px;
      margin-right: 10px;
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
