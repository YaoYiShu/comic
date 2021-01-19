<template>
  <div class="search">
    <Nav :path="-1">
      <!-- 中间的搜索框 -->
      <van-search
        v-model.trim="message"
        placeholder="可按 漫画名 或 漫画家 搜索"
        background="#fc6454"
        slot="center"
        @search="
          message ? handleMsg(message) : '';
          inputing = false;
          message = '';
        "
        @input="inputing = true"
        @cancel="message = ''"
      />
    </Nav>
    <!-- 搜索时显示列表 -->
    <div v-if="inputing && allMatch.length" class="show-msg">
      <p class="search-res">搜索“{{ message }}”</p>
      <ol class="search-res-content">
        <li
          v-for="(item, index) in allMatch"
          :key="index"
          @click="
            inputing = false;
            message = item.keyword;
            !isComicDetails
              ? $router.push({
                  path: '/comicDetails',
                  query: { id: item.comic_id }
                })
              : '';
          "
        >
          <span class="icon"></span>
          <div class="record-content">
            <p>
              {{ item.comic_name }}
              <span class="last_chapter">{{ item.last_chapter.name }}</span>
            </p>
          </div>
        </li>
      </ol>
    </div>

    <template v-if="!allMatch.length && !inputing && !message">
      <div class="content">
        <div class="hot-title">
          <h2>热门搜索</h2>
        </div>
        <!-- 使用声明式 -->
        <!-- <template v-show="hotTitle"> -->
        <van-tag
          v-for="(item, index) in hotTitle"
          :key="index"
          :color="color[set[index]]"
          @click="
            !isComicDetails
              ? $router.push({
                  path: '/comicDetails',
                  query: { id: item.comic_id }
                })
              : ''
          "
          >{{ item.comic_name }}</van-tag
        >
        <!-- </template> -->

        <!-- 记录列表 -->
        <ol class="search-history">
          <h2>
            搜索历史<span
              class="clearAll"
              @click="clearAll"
              :class="recordMsg.length ? 'active' : ''"
              >清空</span
            >
          </h2>
          <li
            v-for="item in reverseRecordMsg"
            :key="item.id"
            @click="
              $router.push({
                path: '/sort',
                query: {
                  key: item.message
                }
              })
            "
          >
            <span class="icon"></span>
            <div class="record-content">
              <p>
                <span>{{ item.message }}</span>
                <i class="del" @click.stop="removeRecord(item.id)"></i>
              </p>
            </div>
            <!-- <div class="more"></div> -->
          </li>
        </ol>
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'lodash';
import Nav from '@/components/Nav';
export default {
  components: {
    Nav
  },
  data() {
    return {
      message: '',
      hotTitle: [],
      color: ['#c78590', '#f3bd7e', '#6ec4e9', '#66c9bb', '#9b9bd5'],
      set: [],
      recordMsg: [],
      allMatch: [],
      inputing: false,
      isComicDetails: false
    };
  },
  created() {
    this.recordMsg = localStorage.zymkRecord
      ? JSON.parse(localStorage.zymkRecord)
      : [];
    this.hotSearchMsg();
    this.dedebouncedGetData = _.debounce(this.getMessage, 300);
  },
  activated() {
    this.hotSearchMsg();
  },
  computed: {
    // 设置颜色
    setColor() {
      return this.hotTitle.forEach((item, index) => {
        this.set.push(index % this.color.length);
      });
    },
    // 倒序记录显示
    reverseRecordMsg() {
      return this.recordMsg.slice().reverse();
    }
  },
  watch: {
    // 变化时颜色监听
    hotTitle(n) {
      return n.forEach((item, index) => {
        this.set.push(index % this.color.length);
      });
    },
    message(n) {
      if (n) {
        if (this.inputing) {
          this.dedebouncedGetData();
        }
      } else {
        this.inputing = false;
        this.allMatch = [];
      }
    }
  },
  methods: {
    // 输入message进行获取数据
    getMessage() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      var that = this;
      if (this.message) {
        this.axios
          .get(
            'https://getconfig-globalapi.zymk.cn/app_api/v5/getsortlist/?sort=click&key=' +
              this.message
          )
          .then(res => {
            // console.log(res.data.data.page.comic_list);
            this.allMatch = res.data.data.page.comic_list;
            that.$toast.clear();
          });
      }
    },
    // 输入时处理事件
    handleMsg(msg) {
      this.recordMsg = this.recordMsg.filter(item => {
        return item.message != msg;
      });

      this.recordMsg.push({
        message: msg,
        id: this.recordMsg.length
          ? this.recordMsg[this.recordMsg.length - 1].id + 1
          : 1
      });
      this.saveRecord();
    },
    // 获取热门搜索
    hotSearchMsg() {
      this.$jsonp('https://api.zymk.cn/app_api/v5/gethotsearch/', {
        callback: 'gethotsearchCb'
      }).then(res => {
        // console.log(res.data.list);
        this.hotTitle = res.data.list;
      });
    },
    // 保存记录为缓存
    saveRecord() {
      localStorage.zymkRecord = JSON.stringify(this.recordMsg);
    },
    // 删除单条记录
    removeRecord(id) {
      // console.log(id);
      this.recordMsg = this.recordMsg.filter(element => {
        return element.id != id;
      });
      this.saveRecord();
    },
    // 删除/清空 所有记录
    clearAll() {
      this.recordMsg = [];
      this.saveRecord();
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  .van-search {
    padding: 5px;
    .van-cell {
      padding: 2px 0;
      font-size: 12px;
    }
  }
  // 热门搜索
  .content {
    padding: 0 10px;
    margin-top: 44px;
    .hot-title,
    .search-history {
      h2 {
        color: #666;
        font-size: 14px;
        padding: 15px 0;
      }
    }
    .van-tag {
      padding: 5px 10px;
      margin: 0 12px 10px 0;
      border-radius: 5px;
    }
  }
}
// 记录列表
.search-history {
  font-size: 14px;
  width: 100%;
  display: flex;
  flex-flow: column;
  margin-bottom: 50px;
  h2 {
    .clearAll {
      float: right;
      padding-right: 5px;
    }
    .clearAll.active {
      color: #fc6454;
    }
  }
  li {
    display: flex;
    flex: 1;
    &.album {
      img {
        width: 50px;
        height: 50px;
      }
    }
    .icon {
      width: 35px;
      height: 45px;
      display: inline-block;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+)
        no-repeat;
      background-size: 50%;
      background-position: 50%;
      border-bottom: 1px solid #eee;
    }
  }
  .record-content {
    width: 100%;
    display: flex;
    position: relative;
    p {
      flex: 1;
      display: flex;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #eee;
      span {
        flex: 1;
        display: inline-block;
        font-size: 12px;
        color: #999;
        padding-left: 15px;
      }
      i.del {
        width: 45px;
        height: 45px;
        display: inline-block;
        background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=)
          no-repeat;
        background-size: 28%;
        background-position: 50%;
      }
    }
  }
}
// 搜索结果页面
.show-msg {
  margin-top: 44px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: 15px;
  p.search-res {
    height: 50px;
    line-height: 50px;
    margin-left: 10px;
    color: #999;
  }
  ol.search-res-content {
    li {
      display: flex;
      flex: 1;
      padding: 0 10px;
      .record-content {
        width: 100%;
        display: flex;
        position: relative;
        p {
          flex: 1;
          font-size: 14px;
          height: 45px;
          line-height: 45px;
          color: #999;
          border-bottom: 1px solid #eee;
          .last_chapter {
            float: right;
          }
        }
      }
    }
  }
}
</style>
