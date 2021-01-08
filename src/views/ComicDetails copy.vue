<template>
  <!--漫画详情-->
  <div class="comic-details">
    <!-- 先占位 -->
    <div class="thumb">
      <div class="info">
        <!-- 背景模糊 -->
        <div
          class="mark"
          :style="
            'background-image:url(https://image.zymkcdn.com/file/cover/000/00' +
              formatId($route.query.id) +
              '.jpg)'
          "
        ></div>
      </div>
      <!-- 图像缩略图 -->
      <div class="comic-item">
        <div class="thumnnail">
          <VanImage
            :item="comicInfo"
            :isComicDetails="isComicDetails"
            :score="comicInfo.score"
          ></VanImage>
        </div>
      </div>
      <!-- 漫画名 -->
      <h1>{{ comicInfo.comic_name }}</h1>
      <!-- 作者 -->
      <span>{{ comicInfo.author_name }}</span>
      <p>
        <!-- 标签 -->
        <!-- :color="color[index % color.length]" -->
        <van-tag
          v-for="(type, index) in comicInfo.comic_type"
          :key="index"
          :color="color[index % color.length]"
          round
          >{{ type.name }}</van-tag
        >
      </p>
      <!-- 点击热度 -->
      <i>{{ comicInfo.total_click | formatClickCount }}</i>
    </div>
    <div class="handlebox">
      <van-tag round plain class="off-line">离线缓存</van-tag>
      <van-tag round color="#fc6454" class="read">开始阅读</van-tag>
    </div>
    <!-- 详情、目录、支持 -->
    <!-- 通过名称匹配 -->
    <van-tabs v-model="activeName" animated swipeable>
      <van-tab class="details" title="详情" name="详情">
        <div class="hd">
          <h2>剧情简介</h2>
        </div>
        <div class="content">{{ comicInfo.desc }}</div>
        <div class="hd">
          <h2>作者信息</h2>
          <div class="content">
            <div class="author-info"></div>
          </div>
          <h2>作者公告</h2>
          <div class="content" v-if="comicInfo.author_info">
            {{ comicInfo.author_info.notice }}
          </div>
        </div>
      </van-tab>
      <van-tab title="目录" name="目录">
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
      </van-tab>
      <van-tab title="支持" name="支持">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import VanImage from '@/components/VanImage';
export default {
  data() {
    return {
      comicInfo: [],
      isComicDetails: true,
      color: ['#c78590', '#f3bd7e', '#6ec4e9', '#66c9bb', '#9b9bd5'],
      activeName: 'a'
    };
  },
  components: {
    VanImage
  },
  created() {
    this.getComicInfo();
  },
  activated() {
    // console.log(this.$route.query.id);
    this.getComicInfo();
  },
  filters: {
    formatClickCount: function(value) {
      let k = 10000;
      let sizes = ['', '万', '亿', '万亿'];
      if (value < k) {
        return value;
      } else {
        let i = Math.floor(Math.log(value) / Math.log(k));
        value = (value / Math.pow(k, i)).toFixed(1);
        return value + sizes[i];
      }
    }
  },
  methods: {
    getComicInfo() {
      this.axios
        .get(
          'https://getcomicinfo-globalapi.zymk.cn/app_api/v5/getcomicinfo/?comic_id=' +
            this.$route.query.id
        )
        .then(res => {
          // console.log(res.data.data);
          this.comicInfo = res.data.data;
        });
    },
    formatId(id) {
      if (id) {
        // id = id.toString();
        if (id.length == 4) {
          return id.substr(0, 1) + '/' + id.substr(1, id.length);
        } else if (id.length == 1) {
          return '0/00' + id;
        } else if (id.length == 3) {
          return '0/' + id;
        } else if (id.length == 2) {
          return '0/0' + id;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.comic-details {
  .thumb {
    position: relative;
    z-index: 2;
    height: 152px;
    padding: 53px 0 0 135px;
    font-size: 10px;
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    h1 {
      font-size: 18px;
    }
    span {
      display: inline-block;
      margin: 3px 0 0;
    }
    p {
      .van-tag {
        padding: 1px 5px;
        margin: 5px 0;
        transform: scale(0.8);
      }
    }
    i {
      font-style: normal;
      &::before {
        content: '';
        width: 1.2em;
        height: 1.2em;
        margin-right: 4px;
        transform: translateY(0.1em);
        background: url('../assets/images/fire.png') no-repeat;
        background-position: 50%;
        background-size: 120%;
        display: inline-block;
      }
    }
    .thumnnail {
      width: 105px;
      border-radius: 3px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .comic-item {
      position: absolute;
      top: 48px;
      left: 12px;
      padding: 2px;
      width: 109px;
      height: 144px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      background: #fff;
      border-radius: 2px;
      overflow: hidden;
    }
    .info {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: #000;
      overflow: hidden;
      .mark {
        width: 200%;
        height: 200%;
        position: absolute;
        bottom: -10%;
        left: -50%;
        -webkit-filter: blur(15px);
        filter: blur(15px);
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: 0.5 !important;
      }
    }
  }
  .handlebox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 44px;
    .read,
    .off-line {
      margin-right: 12px;
      height: 30px;
      padding: 0 20px;
    }
  }
  .van-tabs {
    .details {
      padding: 0 10px;
      border-top: 1px solid #ddd;
      .hd {
        h2 {
          font-size: 14px;
          margin-top: 12px;
          height: 32px;
          line-height: 32px;
        }
      }
      .content {
        text-align: justify;
        text-justify: newspaper;
        word-break: break-all;
        font-size: 14px;
        line-height: 1.5;
        padding-bottom: 16px;
        border-bottom: 1px solid #ddd;
      }
    }
  }
}
</style>
