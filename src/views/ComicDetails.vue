<template>
  <!--漫画详情-->
  <div class="comic-details">
    <!-- 先占位 -->
    <details-nav :name="comicInfo.comic_name"></details-nav>
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
      <van-tag
        round
        color="#fc6454"
        v-if="!currentChapter[0]"
        class="read"
        @click.stop="read()"
        >开始阅读</van-tag
      >
      <van-tag
        round
        color="#fc6454"
        v-if="currentChapter[0]"
        class="read"
        @click.stop="read()"
        >续看: {{ currentChapter[0].chapter_name }}</van-tag
      >
    </div>
    <!-- 详情、目录、支持 -->
    <!-- 通过名称匹配 -->
    <van-tabs @click="onClick" ref="tabs" v-model="active">
      <van-tab
        v-for="(item, index) in title"
        :key="index"
        :title="item"
      ></van-tab>
    </van-tabs>
    <!-- 轮播 -->
    <van-swipe
      class="my-swipe"
      :loop="false"
      swipeTo="2"
      indicator-color="white"
      @change="onChange"
      ref="swiper"
      :show-indicators="false"
    >
      <!--1. 详情 -->
      <van-swipe-item class="details">
        <div ref="mkDetails">
          <div class="hd">
            <h2>剧情简介</h2>
          </div>
          <div class="content" style="font-size:14px">
            {{ comicInfo.desc }}
          </div>
          <!-- 作者信息、作者公告 -->
          <div class="hd" v-if="comicInfo.author_info">
            <h2>作者信息</h2>
            <div class="content">
              <span class="avator"></span>
              <div class="author-info">
                <div class="author-name">
                  {{ comicInfo.author_info.Uname }}
                </div>
                <div class="author-fans">
                  粉丝<i style="color:#fc6454;font-style:normal">{{
                    comicInfo.author_info.Cfans
                  }}</i
                  >人
                </div>
              </div>
            </div>
            <h2>作者公告</h2>
            <div
              class="content"
              :style="
                comicInfo.author_info.relation_list ? '' : 'border-bottom:0'
              "
            >
              {{ comicInfo.author_info.notice }}
            </div>
          </div>
          <!-- 作者作品 -->
          <div class="autor-production">
            <div class="hd">
              <!-- comicInfo.author_info.relation_list -->
              <!-- <template v-show="comicInfo.chapter_list">
                <h2 class="book">
                  作者作品
                </h2>
              </template> -->
            </div>
            <!-- <template v-show="comicInfo.chapter_list">
              <DetailsSwipe
                :recommend="comicInfo.author_info.data"
                :relation="comicInfo.author_info.relation_list"
              ></DetailsSwipe>
            </template> -->
          </div>
        </div>
        <!-- 相关推荐 -->
      </van-swipe-item>
      <!--2. 目录 -->
      <van-swipe-item class="catalogue">
        <div class="box" ref="catalogue">
          <div class="hd">
            <h2 style="padding:0 10px;color:#999;">
              最近更新:
              <i class="updateTime">{{ formatTime(comicInfo.update_time) }}</i
              ><span class="toggle up" @click.stop="isUp = !isUp" v-show="isUp"
                >升序</span
              >
              <span
                class="toggle down"
                @click.stop="isUp = !isUp"
                v-show="!isUp"
                >降序</span
              >
            </h2>
            <!-- :style="
                comicInfo.chapter_list.length >= 12
                  ? 'height:120px'
                  : 'height: auto'
              " -->
            <div class="mk-chapterlist-box" ref="chapterlist">
              <span
                @click.stop="
                  toRead($route.query.id, list.chapter_id, list.chapter_name)
                "
                v-for="(list, index) in isUp
                  ? ucomicInfo
                  : comicInfo.chapter_list"
                :key="index"
                ><i class="ellipsis">{{ list.chapter_name }}</i></span
              >
              <span class="app-empty-item"></span>
              <span class="app-empty-item"></span>
              <span class="app-empty-item"></span>
            </div>
            <div
              class="button"
              v-if="comicInfo.chapter_list.length >= 12 ? true : false"
            >
              <span @click.self="toggle()">查看全部</span>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <!--3. 支持 -->
      <van-swipe-item>
        <div ref="influence">
          <ul class="support">
            <li>
              <span class="sub-icons icon-recommend"></span>
              <p>推荐{{ comicInfo.recommend | formatCount }}人</p>
            </li>
            <li>
              <span class="sub-icons icon-gold"></span>
              <p>打赏{{ comicInfo.gold | formatCount }}元宝</p>
            </li>
            <li>
              <span class="sub-icons icon-total_ticket"></span>
              <p>月票{{ comicInfo.total_ticket | formatCount }}张</p>
            </li>
            <li>
              <span class="sub-icons icon-jury"></span>
              <p>打分{{ comicInfo.jury | formatCount }}人</p>
            </li>
            <li>
              <span class="sub-icons icon-collection"></span>
              <p>收藏{{ comicInfo.collection | formatCount }}人</p>
            </li>
            <li>
              <span class="sub-icons icon-share"></span>
              <p>分享{{ comicInfo.share | formatCount }}次</p>
            </li>
          </ul>
          <div class="influence">
            <div class="hd">
              <h2 style="padding: 0 10px">
                粉丝影响力
                <span class="toinfluence" @click="toInfluence($route.query.id)"
                  >更多</span
                >
              </h2>
            </div>
            <div style="display:none" ref="FansInfluence">
              <FansInfluence></FansInfluence>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="mk-recommend" ref="recommend">
      <div class="mk"></div>
      <div class="hd">
        <h2 style="padding-left:10px;margin-top:8px">相关推荐</h2>
      </div>
      <div style="padding:0 0 20px 10px">
        <DetailsSwipe :recommend="comicInfo.relation_list"></DetailsSwipe>
      </div>
    </div>
  </div>
</template>

<script>
import VanImage from '@/components/VanImage';
import DetailsSwipe from '@/components/DetailsSwipe';
import FansInfluence from '@/components/FansInfluence';
import DetailsNav from '../components/DetailsNav.vue';
export default {
  components: {
    VanImage,
    DetailsSwipe,
    FansInfluence,
    DetailsNav
  },
  data() {
    return {
      currentChapter: [],
      comicInfo: [],
      isComicDetails: true,
      color: ['#c78590', '#f3bd7e', '#6ec4e9', '#66c9bb', '#9b9bd5'],
      title: ['详情', '目录', '支持'],
      isToggle: false,
      active: 2,
      isUp: false,
      comicChapterRecord: localStorage.comicChapterRecord
        ? JSON.parse(localStorage.comicChapterRecord)
        : []
    };
  },
  created() {
    this.comicInfo = localStorage.comicInfo
      ? JSON.parse(localStorage.comicInfo)
      : [];
    this.getComicInfo();
    // console.log('comicChapterRecord', this.comicChapterRecord);
    this.currentChapter = this.comicChapterRecord.filter(item => {
      return item.id === this.$route.query.id;
    });
    // console.log(this.currentChapter);
  },
  computed: {
    ucomicInfo() {
      return this.comicInfo.chapter_list.slice().reverse();
    }
  },
  mounted() {
    this.getComicInfo();
    this.$refs.tabs.scrollTo(1);
    this.$refs.swiper.swipeTo(1);
  },
  activated() {
    this.getComicInfo();
    this.$refs.tabs.scrollTo(1);
    this.$refs.swiper.swipeTo(1);

    this.currentChapter = this.comicChapterRecord.filter(item => {
      // console.log(item.id, this.$route.query.id);
      return item.id == this.$route.query.id;
    });
    console.log(this.currentChapter);
    // console.log(this.currentChapter.chapter_name);
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
    },
    formatCount: function(value) {
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
    // 点击标签切换
    onClick(name) {
      // console.log(name);
      this.$refs.swiper.swipeTo(name);
    },
    // 滑动时更改点击tab
    onChange(index) {
      this.$refs.tabs.scrollTo(index);
      if (index === 1) {
        this.$refs.catalogue.style.position = 'relative';
        this.$refs.mkDetails.style.position = 'absolute';
        this.$refs.influence.style.position = 'absolute';
        this.$refs.FansInfluence.style.display = 'none';
      }
      if (index === 0) {
        this.$refs.catalogue.style.position = 'absolute';
        this.$refs.mkDetails.style.position = 'relative';
        this.$refs.influence.style.position = 'absolute';
        this.$refs.FansInfluence.style.display = 'none';
      }
      if (index === 2) {
        this.$refs.catalogue.style.position = 'absolute';
        this.$refs.mkDetails.style.position = 'absolute';
        this.$refs.influence.style.position = 'relative';
        this.$refs.FansInfluence.style.display = 'block';
      }
    },
    getComicInfo() {
      if (this.$route.query.id) {
        this.axios
          .get(
            'https://getcomicinfo-globalapi.zymk.cn/app_api/v5/getcomicinfo/?comic_id=' +
              this.$route.query.id
          )
          .then(res => {
            this.comicInfo = res.data.data;
            this.saveComicInfo();
          });
      }
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
    },
    saveComicInfo() {
      localStorage.comicInfo = JSON.stringify(this.comicInfo);
    },
    toggle() {
      this.isToggle = !this.isToggle;
      // console.log(this.isToggle);
      if (this.isToggle) {
        this.$refs.chapterlist.style.height = 'auto';
      } else {
        this.$refs.chapterlist.style.height = '120px';
      }
      /*
      if (this.isToggle) {
        this.$refs.chapterlist.style.height = 'auto';
      } else {
        this.$refs.chapterlist.style.height = '120px';
      }
      */
    },
    toInfluence(id, url) {
      // console.log(id, url);
      this.$router.push({
        path: '/influence',
        query: {
          id,
          url
        }
      });
    },
    toRead(id, chapter_id, chapter_name) {
      this.$router.push({
        path: '/read',
        query: {
          id,
          chapter_id
        }
      });
      // 筛选阅读记录
      this.comicChapterRecord = this.comicChapterRecord.filter(item => {
        return item.id != id;
      });

      this.comicChapterRecord.push({
        id,
        chapter_id,
        chapter_name
      });

      this.savaLocal();
      // console.log('this.comicChapterRecord', this.comicChapterRecord);
    },
    savaLocal() {
      localStorage.comicChapterRecord = JSON.stringify(this.comicChapterRecord);
    },
    formatTime(timestamp) {
      // 补全为13位
      var arrTimestamp = (timestamp + '').split('');
      for (var start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
          arrTimestamp[start] = '0';
        }
      }
      timestamp = arrTimestamp.join('') * 1;
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      // var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();
      var diffValue = now - timestamp;

      // 如果本地时间反而小于变量时间
      if (diffValue < 0) {
        return '不久前';
      }
      // 计算差异时间的量级
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;

      // 数值补0方法
      var zero = function(value) {
        if (value < 10) {
          return '0' + value;
        }
        return value;
      };

      // 使用
      if (monthC > 4) {
        // 超过1年，直接显示年月日
        return (function() {
          var date = new Date(timestamp);
          return (
            date.getFullYear() +
            '-' +
            zero(date.getMonth() + 1) +
            '-' +
            zero(date.getDate())
          );
        })();
      } else if (monthC >= 1) {
        return parseInt(monthC) + '月前';
      } else if (weekC >= 1) {
        return parseInt(weekC) + '周前';
      } else if (dayC >= 1) {
        return parseInt(dayC) + '天前';
      } else if (hourC >= 1) {
        return parseInt(hourC) + '小时前';
      } else if (minC >= 1) {
        return parseInt(minC) + '分钟前';
      }
      return '刚刚';
    },
    read() {
      this.id = Math.min.apply(
        Math,
        this.comicInfo.chapter_list.map(item => item.chapter_id)
      );
      this.chapter = this.comicInfo.chapter_list.filter(
        item => item.chapter_id == this.id
      );
      // console.log(this.chapter[0].chapter_name);

      this.$router.push({
        path: '/read',
        query: {
          id: this.$route.query.id,
          chapter_id: this.currentChapter[0]
            ? this.currentChapter[0].chapter_id
            : this.id
        }
      });

      this.comicChapterRecord = this.comicChapterRecord.filter(item => {
        return item.id != this.$route.query.id;
      });

      this.comicChapterRecord.push({
        id: this.$route.query.id,
        chapter_id: this.id,
        chapter_name: this.chapter[0].chapter_name
      });
      this.savaLocal();
    }
  }
};
</script>

<style lang="less" scoped>
.comic-details {
  position: relative;
  // background-color: #f5f5f5;
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
}
.van-swipe {
  .details,
  .catalogue {
    border-top: 1px solid #ddd;
  }
  .details {
    width: 100%;
    padding: 0 10px;
  }
  .author-name {
    &::after {
      content: '';
      width: 30px;
      height: 20px;
      margin-left: 5px;
      transform: translateY(25%);
      display: inline-block;
      background: url('../assets/images/new.png') no-repeat;
      background-position: 50%;
      background-size: cover;
    }
  }
  .avator {
    display: inline-block;
    width: 32px;
    height: 32px;
    background: url('../assets/images/error.png') no-repeat;
    background-position: 50%;
    border-radius: 50%;
    margin-right: 5px;
  }
}
.hd {
  h2 {
    font-size: 14px;
    margin-top: 12px;
    height: 32px;
    line-height: 32px;
  }
  .book {
    &::before {
      content: '';
      display: inline-block;
      background: url('../assets/images/book.png') no-repeat;
      background-size: cover;
      transform: translateY(25%);
      width: 1.2em;
      height: 1.2em;
      margin-right: 5px;
    }
  }
}
.content {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: justify;
  text-justify: newspaper;
  word-break: break-all;
  font-size: 14px;
  line-height: 1.5;
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
  font-size: 12px;
  color: #666;
}
.box {
  // 切换剪切
  // position: absolute;
  width: 100%;
  .mk-chapterlist-box {
    width: 100%;
    height: 120px;
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    // justify-content: space-between;
    overflow: hidden;
    span {
      display: flex;
      text-align: center;
      font-size: 14px;
      color: #555;
      flex: 1 1 calc(100vw / 5);
      height: 32px;
      background: #f5f5f5;
      justify-content: center;
      align-items: center;
      margin: 0 10px 10px 0;
      overflow: hidden;
      i.ellipsis {
        font-style: normal;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
      &:nth-of-type(4n) {
        margin-right: 0;
      }
      &:last-child {
        width: 33.33%;
        margin-right: 0;
      }
    }
  }
}
.mk-recommend {
  .mk {
    width: 100%;
    height: 8px;
    background-color: #f5f5f5;
  }
}
.button {
  padding: 10px;
  span {
    display: inline-block;
    width: 100%;
    border: 1px solid #999;
    border-radius: 10px;
    color: #999;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }
}
ul.support {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 100%;
  height: 181px;
  align-items: center;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  li {
    flex: 1 1 calc(100% / 3);
    .sub-icons {
      display: inline-block;
      width: 48px;
      height: 48px;
      margin: 0 auto;
      background: url('../assets/images/sprite_detail.png') no-repeat;
      background-size: 150px 100px;
    }
    p {
      font-size: 14px;
      color: #999;
    }
    .icon-recommend {
      background-position: 0 0;
    }
    .icon-gold {
      background-position: -50px 0;
    }
    .icon-total_ticket {
      background-position: -100px 0;
    }
    .icon-jury {
      background-position: 0px -50px;
    }
    .icon-collection {
      background-position: -50px -50px;
    }
    .icon-share {
      background-position: -100px -50px;
    }
  }
}
.toinfluence {
  float: right;
  color: #999;
}
.updateTime {
  font-style: normal;
  font-size: 13px;
  color: #333;
}
.toggle.up {
  float: right;
  &::before {
    width: 1em;
    height: 1em;
    transform: translateY(25%) rotate(180deg);
    margin-right: 5px;
    content: '';
    display: inline-block;
    background: url('../assets/images/down.png') no-repeat;
    background-position: 50%;
    background-size: cover;
  }
}
.toggle.down {
  float: right;
  &::before {
    width: 1em;
    height: 1em;
    transform: translateY(25%);
    margin-right: 5px;
    content: '';
    display: inline-block;
    background: url('../assets/images/down.png') no-repeat;
    background-position: 50%;
    background-size: cover;
  }
}
.app-empty-item {
  cursor: default;
  height: 0 !important;
  margin-top: 0;
  background-color: #fff !important;
}
</style>
