<template>
  <div class="influence-content">
    <ul class="rank" v-if="ufansLists.length > 0">
      <template v-if="ufansLists.length > 3">
        <li class="rank-2st">
          <van-image
            :src="
              'https://image.zymkcdn.com/file/head/' +
                ufansLists[1].formatUid +
                '.jpg'
            "
            round
            v-lazy=""
            fit="cover"
          />
          <p class="uname">{{ ufansLists[1].uname }}</p>
          <p class="i-count">
            影响力<span class="amount">{{ ufansLists[1].amount }}</span>
          </p>
        </li>
        <li class="rank-1st">
          <van-image
            :src="
              'https://image.zymkcdn.com/file/head/' +
                ufansLists[0].formatUid +
                '.jpg'
            "
            round
            fit="cover"
          />
          <p class="uname">{{ ufansLists[0].uname }}</p>
          <p class="i-count">
            影响力<span class="amount">{{ ufansLists[0].amount }}</span>
          </p>
        </li>
        <li class="rank-3st">
          <van-image
            :src="
              'https://image.zymkcdn.com/file/head/' +
                ufansLists[2].formatUid +
                '.jpg'
            "
            round
            fit="cover"
          />
          <p class="uname">{{ ufansLists[2].uname }}</p>
          <p class="i-count">
            影响力<span class="amount">{{ ufansLists[2].amount }}</span>
          </p>
        </li>
      </template>
      <template v-if="ufansLists.length <= 2">
        <li class="rank-1st">
          <van-image
            :src="
              'https://image.zymkcdn.com/file/head/' +
                ufansLists[0].formatUid +
                '.jpg'
            "
            round
            fit="cover"
          />
          <p class="uname">{{ ufansLists[0].uname }}</p>
          <p class="i-count">
            影响力<span class="amount">{{ ufansLists[0].amount }}</span>
          </p>
        </li>
        <li class="rank-2st">
          <van-image
            :src="
              'https://image.zymkcdn.com/file/head/' +
                ufansLists[1].formatUid +
                '.jpg'
            "
            round
            fit="cover"
          />
          <p class="uname">{{ ufansLists[1].uname }}</p>
          <p class="i-count">
            影响力<span class="amount">{{ ufansLists[1].amount }}</span>
          </p>
        </li>
      </template>
    </ul>
    <FansFluenceItem></FansFluenceItem>
  </div>
</template>

<script>
import FansFluenceItem from '@/components/FansFluenceItem';
export default {
  components: {
    FansFluenceItem
  },
  data() {
    return {
      currentIndex: 1
    };
  },
  created() {
    // this.getFansList();
    // console.log(this.$route.query.id);
  },
  mounted() {
    this.$store.dispatch('getFansList', {
      id: this.$route.query.id,
      num: 10,
      currentIndex: this.currentIndex
    });
  },
  activated() {
    // this.getFansList();
  },
  computed: {
    ufansLists() {
      return this.$store.state.fansLists.map(item => {
        return {
          formatUid: this.formatUid(item.uid),
          uname: item.uname,
          amount: item.amount
        };
      });
    }
  },
  methods: {
    // getFansList() {
    //   this.axios
    //     .get(
    //       'https://api.zymk.cn/app_api/v5/gift_effectslist/?comic_id=' +
    //         this.$route.query.id +
    //         '&rows=10&page=' +
    //         this.currentIndex +
    //         ''
    //     )
    //     .then(res => {
    //       console.log(res.data.data);
    //       this.fansLists = res.data.data.map(item => {
    //         return {
    //           formatUid: this.formatUid(item.uid),
    //           uname: item.uname,
    //           amount: item.amount
    //         };
    //       });
    //       // console.log(this.fansLists);
    //     });
    // },
    formatUid(id) {
      // console.log('formatUid', id);
      if (id) {
        id = id.toString();
        if (id.length === 8) {
          return (
            '0' + id.substr(0, 2) + '/' + id.substr(2, 3) + '/' + id.substr(5)
          );
        }
        if (id.length === 7) {
          return (
            '00' + +id.substr(0, 1) + '/' + id.substr(1, 3) + '/' + id.substr(4)
          );
        }
        if (id.length === 6) {
          return '000/' + id.substr(0, 3) + '/' + id.substr(3);
        }
        if (id.length === 5) {
          return '000/0' + id.substr(0, 2) + '/' + id.substr(2);
        }
        if (id.length === 4) {
          return '000/00' + id.substr(0, 1) + '/' + id.substr(1);
        }
        if (id.length === 3) {
          return '000/000/' + id.substr(0);
        }
        if (id.length === 2) {
          return '000/000/0' + id.substr(0);
        }
        if (id.length === 1) {
          return '000/000/00' + id.substr(0);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.influence-content {
  width: 100%;
  .rank {
    // height: 127px;
    display: flex;
    text-align: center;
    // border-bottom: 1px solid #ddd;
    li {
      flex: 1 1 33.3%;
      // img {
      //   border-radius: 50%;
      //   width: 75px;
      //   height: 75px;
      // }
      p {
        &.i-count {
          color: #999;
        }
        span {
          color: #fc6454;
        }
      }
    }
    .rank-2st,
    .rank-3st {
      margin-top: 10px;
    }
    .uname {
      white-space: nowrap; /*内容超宽后禁止换行显示*/
      overflow: hidden; /*超出部分隐藏*/
      text-overflow: ellipsis; /*文字超出部分以省略号显示*/
    }
  }
  .van-image {
    width: 75px;
    height: 75px;
  }
}
</style>
