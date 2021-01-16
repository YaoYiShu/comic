<template>
  <div class="more">
    <div
      class="figure"
      :style="
        'background-image:url(http://image.zymkcdn.com/file/zymk_images/book/' +
          formatBannerId(book.book_id) +
          '.jpg-noresize.webp)'
      "
    >
      <div class="box" :style="{ opacity: opacity }">
        <router-link to="/" class="back "
          ><span class="iconfont icon-xiangzuofanhui"></span
        ></router-link>
        <span class="title">{{ formatTitleHandle(book.title) }}</span>
      </div>

      <router-link to="/" class="back "
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
      set: [],
      opacity: 0
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
    window.addEventListener('scroll', this.handleScroll, true);
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
    formatBannerId(id) {
      id = id.toString();
      return (
        '00' + id.substr(0, 1) + '/' + id.substr(1, 3) + '/' + id.substr(4)
      );
    },
    formatTitleHandle(value) {
      if (!value) return '';
      value = value.toString();
      if (value.substr(0, 1) != '「' && value.substr(0, 1) != '【') {
        return '【' + value + '】';
      } else {
        return value;
      }
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
        // console.log('down');
        // console.log(scroll);
        if (this.opacity) {
          this.opacity = this.opacity - 0.2;
        }
        this.opacity = 0;
      } else if (scroll > 0) {
        // console.log('up');
        this.opacity = this.opacity + 0.2;
        if (this.opacity >= 1) {
          this.opacity = 1;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.more {
  width: 100%;
  .figure {
    // position: relative;
    display: flex;
    // background: aquamarine;
    // background: url('../assets/images/007.jpg') no-repeat;
    background-repeat: no-repeat;
    background-size: cover;
    align-items: flex-end;
    height: 210px;
    .back {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      position: absolute;
      top: 5px;
      left: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      &.scrollBack {
        width: 100%;
        height: 44px;
        background-color: #fff;
      }
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
  .box {
    width: 100%;
    height: 40px;
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 2;
    border-bottom: 1px solid #ddd;
    .back {
      background-color: transparent;
    }
    .title {
      width: 100%;
      font-size: 15px;
      color: #fc6454;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    span.iconfont {
      color: #fc6454;
    }
  }
}
</style>
