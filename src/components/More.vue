<template>
  <div class="more">
    <div class="figure">
      <router-link to="/" class="back"
        ><span class="iconfont icon-xiangzuofanhui"></span
      ></router-link>
      <span class="figure-title" ref="title">{{
        formatTitleHandle(book.title)
      }}</span>
    </div>
    <div class="book-desc">
      <div class="icon-box">
        <span class="iconfont icon-xinaixin">0</span>
        <span class="iconfont icon-fenxiang">0</span>
        <span class="iconfont icon-liuyan">0</span>
      </div>
      <div class="content">介绍</div>
    </div>
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in book.comic_info"
        :key="index"
        @click="
          $router.push({
            path: '/comicDetails',
            query: { id: item.comic_id }
          })
        "
      >
        <VanImage
          :item="item"
          :book="book"
          :index="index"
          :ismore="true"
        ></VanImage>

        <div class="info">
          <h4>{{ item.comic_name }}</h4>
          <van-tag
            round
            type="primary"
            v-for="(tag, index) in type(item.comic_type)"
            :key="index"
            :color="color[index % color.length]"
            >{{ tag }}</van-tag
          >
          <p>
            推荐理由: <span>{{ item.content }}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import VanImage from '@/components/VanImage';
export default {
  components: {
    VanImage
  },
  data() {
    return {
      book: [],
      color: ['#c78590', '#f3bd7e', '#6ec4e9', '#66c9bb', '#9b9bd5'],
      set: []
    };
  },
  filters: {
    pingfen(value) {
      if (!value) return '';
      value = value.toString();
      if (value.length === 2) {
        return value.substr(0, 1) + '.' + value.substr(1);
      }
      if (value.length === 3) {
        return value.substr(0);
      }
    }
  },
  created() {
    this.book = JSON.parse(localStorage.book);
  },
  activated() {
    this.book = JSON.parse(localStorage.book);
  },
  methods: {
    formatId(id) {
      if (id.toString().length == 4) {
        return (
          id.toString().substr(0, 1) + '/' + id.toString().substr(1, id.length)
        );
      } else if (id.toString().length == 1) {
        return '0/00' + id;
      } else if (id.toString().length == 3) {
        return '0/' + id;
      } else if (id.toString().length == 2) {
        return '0/0' + id;
      }
    },
    type(res) {
      let a = Array.from(new Set([...res, '连载', '少男', '其他']));
      return a;
    },
    // randomColor() {
    //   return Math.floor(Math.random() * this.color.length);
    // },
    formatTitleHandle(value) {
      if (!value) return '';
      value = value.toString();
      if (value.substr(0, 1) != '「' && value.substr(0, 1) != '【') {
        return '【' + value + '】';
      } else {
        return value;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.more {
  width: 100%;
  .figure {
    display: flex;
    // background: aquamarine;
    background: url('../assets/images/007.jpg') no-repeat;
    background-size: cover;
    align-items: flex-end;
    height: 210px;
    .back {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      position: absolute;
      top: 15px;
      left: 15px;
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
        display: inline-block;
        width: 20px;
        height: 20px;
        font-size: 18px;
        color: #fefefe;
      }
    }
    .figure-title {
      width: 100%;
      color: #fff;
      padding: 10px 0;
      font-size: 16px;
    }
  }
  .book-desc {
    height: 40px;
    padding: 0 10px 20px;
    .icon-box {
      width: 100%;
      line-height: 40px;
      height: 40px;
      span {
        display: inline-block;
        width: 40px;
        height: 40px;
        padding-right: 10px;
      }
    }
  }
  .list {
    display: flex;
    flex-flow: column;
    padding-left: 10px;
    .item {
      display: flex;
      width: 100%;
      margin: 0 0 10px;
      padding: 0 0 10px;
      border-bottom: 1px solid #ddd;
      .van-image {
        position: relative;
        margin-right: 10px;
        width: 60px;
        height: 80px;
        // .icon-xing {
        //   font-size: 12px;
        //   position: absolute;
        //   top: 0;
        //   right: 0;
        //   color: #fff;
        //   padding: 0 3px 0 8px;
        //   background-color: rgba(0, 0, 0, 0.5);
        //   border-radius: 10px 0 0 10px;
        //   &::before {
        //     content: '';
        //     display: inline-block;
        //     width: 12px;
        //     height: 12px;
        //     background: url('../assets/images/xing.png') no-repeat;
        //     background-size: 100%;
        //     margin-right: 2px;
        //     background-position: bottom center;
        //   }
        // }
      }
      .info {
        h4 {
          font-size: 14px;
        }
        .van-tag {
          font-size: 12px;
          margin: 10px 0;
          padding: 0 5px;
          margin-right: 5px;
        }
        p {
          font-size: 12px;
          span {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
