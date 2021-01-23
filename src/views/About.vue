<template>
  <div>
    <div class="about" v-if="$root.isAbout">
      <template v-if="$route.path == '/about'">
        <div class="user-banner">
          <!-- 头像 -->
          <div class="avator-box" @click.stop="$router.push('about/modify')">
            <div class="avator">
              <img
                src="http://image.zymkcdn.com/file/head/028/356/222.jpg-100x100"
                alt=""
              />
            </div>
            <span class="uname">游客<i class="sex">男</i></span>
            <span class="address">漫客_28356222</span>
          </div>
          <div class="user-signin">
            <!-- 签到图 -->
            <img
              src="https://m.zymk.cn/static/images/default/signinbtn.png"
              alt=""
              @click="$router.push('/login')"
            />
          </div>
          <div class="red-bd">
            <span>粉丝<i>0</i></span>
            <span>关注<i>0</i></span>
            <span>动态<i>0</i></span>
          </div>
        </div>
        <div class="count-box">
          <div class="white-bd">
            <a href="javascript:;"
              ><img
                src="https://m.zymk.cn/static/images/default/icons/gold.png"
                alt=""
              />
              <div class="count-item">元宝<span class="num">0</span></div>
            </a>
            <a href="javascript:;"
              ><img
                src="https://m.zymk.cn/static/images/default/icons/ticket.png"
                alt=""
              />
              <div class="count-item">月票<span class="num">2</span></div>
            </a>
            <a href="javascript:;"
              ><img
                src="https://m.zymk.cn/static/images/default/icons/recommend.png"
                alt=""
              />
              <div class="count-item">推荐<span class="num">20</span></div>
            </a>
          </div>
        </div>
        <div class="tab-container">
          <div class="box">
            <ul>
              <li
                v-for="(item, index) in title"
                :key="index"
                @click="
                  active = index;
                  $refs.swipe.swipeTo(index);
                "
                :class="{ active: active == index }"
              >
                <span>{{ item }}</span>
              </li>
            </ul>
            <div class="more">
              {{ collectRecords.length }}<van-icon name="arrow" />
            </div>
          </div>
          <van-swipe
            class="my-swipe"
            :loop="false"
            indicator-color="white"
            @change="onChange"
            ref="swipe"
            :show-indicators="false"
          >
            <van-swipe-item>
              <div class="history">
                <template v-if="collectRecords.length == 0">
                  <span class="iconfont icon-xiaoniao"></span>
                  <span>暂无数据</span>
                </template>
                <ul v-if="collectRecords.length > 0">
                  <li
                    v-for="(item, index) in collectRecords.slice(0, 3)"
                    :key="item.comic_id"
                  >
                    <VanImage
                      :item="item"
                      :index="index"
                      :score="item.score"
                    ></VanImage>
                    <h3>{{ item.comic_name }}</h3>
                  </li>
                  <li
                    v-if="collectRecords.length == 2"
                    class="app-empty-item"
                  ></li>
                  <li
                    class="app-empty-item"
                    v-if="collectRecords.length == 1"
                  ></li>
                  <li
                    class="app-empty-item"
                    v-if="collectRecords.length == 1"
                  ></li>
                </ul>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="history">
                <span class="iconfont icon-xiaoniao"></span>
                <span>暂无数据</span>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="menu">
          <ol>
            <li @click.stop="$router.push('/about/pay')">
              <img
                src="https://m.zymk.cn/static/images/default/icons/pay.png"
                alt=""
              />
              <h5>充值中心</h5>
              <span class="tips">元宝充值，解锁新章节，不剁手不舒服斯基</span>
            </li>
            <li>
              <img
                src="https://m.zymk.cn/static/images/default/icons/help.png"
                alt=""
              />
              <h5>使用帮助</h5>
              <span class="tips"
                ><span class="menu-tips">找编辑mm么么哒~.~</span></span
              >
            </li>

            <li>
              <img
                src="https://m.zymk.cn/static/images/default/icons/feedback.png"
                alt=""
              />
              <h5>反馈报错</h5>
              <span class="tips">来啊~找错啊~反正有大把时光~</span>
            </li>
          </ol>
        </div>
        <!-- 登录框 -->
        <div class="login" @click="$router.push('/login')">登录</div>
      </template>
      <router-view></router-view>
    </div>
    <transition
      name="cutsom-classes-transition"
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <section v-if="!$root.isAbout">
        <Type></Type>
      </section>
    </transition>
    <transition name="van-slide-up" v-if="$route.path == '/about'">
      <FooterBar :toggle="toggle" :path="'update'"></FooterBar>
    </transition>
  </div>
</template>

<script>
import FooterBar from '@/components/FooterBar';
import Type from '../views/Type';
import VanImage from '@/components/VanImage';
export default {
  components: {
    FooterBar,
    Type,
    VanImage
  },
  data() {
    return {
      active: 0,
      toggle: true,
      title: ['订阅', '历史'],
      collectRecords: []
    };
  },
  created() {
    window.addEventListener('scroll', this.handleScroll, true);
    this.collectRecords = localStorage.collectRecords
      ? JSON.parse(localStorage.collectRecords)
      : [];
  },
  methods: {
    onChange(name) {
      // console.log(name);
      this.active = name;
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
.about {
  width: 100%;
  .user-banner {
    color: #fff;
    position: relative;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: 195px;
    background: darksalmon;
    .avator-box {
      margin-top: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      .avator {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        background: #ccc;
        border-radius: 50%;
        img {
          border: 2px solid #fefefe;
          border-radius: 50%;
          width: 70px;
          height: 70px;
        }
      }
      span.uname {
        padding-top: 10px;
      }
      span.address {
        padding-top: 5px;
      }
    }
    .user-signin {
      width: 35px;
      height: 74px;
      position: absolute;
      top: 24px;
      right: 15px;
    }
    .red-bd {
      border-radius: 10px 10px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 0;
      width: 323px;
      height: 30px;
      background-color: #fc6454;
      span {
        display: inline-block;
        flex: 1 1 33.33%;
        text-align: center;
        i {
          padding-left: 5px;
        }
      }
    }
  }
  .count-box {
    height: 62px;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #f6f6f6;
    .white-bd {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 321px;
      height: 50px;
      border-radius: 0 0 10px 10px;
      box-shadow: 0 0 4px #999;
      a {
        display: flex;
        justify-content: center;
        flex: 1 1 33.33%;
        img {
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
        .count-item {
          color: #999;
          text-align: center;
          width: 24px;
          height: 28px;
        }
      }
    }
  }
  .tab-container {
    .box {
      width: 100%;
      display: flex;
      height: 44px;
      border-bottom: 2.5px solid#f5f5f5;
      ul {
        flex: 1;
        li {
          float: left;
          height: 44px;
          line-height: 44px;
          font-size: 14px;
          border-bottom: 2.5px solid transparent;
          span {
            padding: 0 20px;
          }
          &.active {
            color: #fc6454;
            border-bottom: 2.5px solid #fc6454;
          }
        }
      }
      .more {
        width: 80px;
        padding-right: 15px;
        line-height: 44px;
        text-align: right;
        font-size: 14px;
        .van-icon {
          transform: translateY(15%);
        }
      }
    }
    .van-swipe {
      padding-bottom: 8px;
      background-color: #f5f5f5;
      .van-swipe-item {
        background-color: #fff;
        min-height: 180px;
        .history {
          font-size: 12px;
          min-height: 180px;
          // transform: translateY(50%);
          width: 100%;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          color: #999;
          .iconfont {
            font-size: 64px;
          }
        }
      }
    }
  }
  .menu {
    ol {
      li {
        padding: 0 15px;
        display: flex;
        align-items: center;
        height: 37px;
        border-bottom: 1px solid #f5f5f5;
        img {
          width: 18x;
          height: 18px;
          padding-right: 5px;
        }
        h5 {
          flex: 1;
          font-size: 14px;
        }
        .tips {
          color: #b9b9b9;
        }
      }
    }
  }
  .login {
    height: 44px;
    border-radius: 2px;
    background-color: #fc6454;
    margin: 20px 10px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 44px;
    // margin-bottom: 70px;
  }
  .history {
    ul {
      padding: 10px 10px;
      width: 100%;
      height: 100%;
      display: flex;
      text-align: center;
      li {
        flex: 1 1 calc(100% / 3 - 20px);
        // background-color: aqua;
        &:nth-of-type(2n + 2) {
          margin: 0 10px;
        }
        h3 {
          height: 18px;
          font-size: 12px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
      .app-empty-item {
        cursor: default;
        height: 0;
        margin: 0;
      }
    }
  }
}
</style>
