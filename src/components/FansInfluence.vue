<template>
  <div class="influence-content">
    <ul class="rank" v-if="fansLists.length">
      <li class="rank-2st">
        <img
          :src="
            'https://image.zymkcdn.com/file/head/' +
              fansLists[1].formatUid +
              '.jpg'
          "
          alt=""
        />
        <p>{{ fansLists[1].uname }}</p>
        <p class="i-count">
          影响力<span class="amount">{{ fansLists[1].amount }}</span>
        </p>
      </li>
      <li class="rank-1st">
        <img
          :src="
            'https://image.zymkcdn.com/file/head/' +
              fansLists[0].formatUid +
              '.jpg'
          "
          alt=""
        />
        <p>{{ fansLists[0].uname }}</p>
        <p class="i-count">
          影响力<span class="amount">{{ fansLists[0].amount }}</span>
        </p>
      </li>
      <li class="rank-3st">
        <img
          :src="
            'https://image.zymkcdn.com/file/head/' +
              fansLists[2].formatUid +
              '.jpg'
          "
          alt=""
        />
        <p>{{ fansLists[2].uname }}</p>
        <p class="i-count">
          影响力<span class="amount">{{ fansLists[2].amount }}</span>
        </p>
      </li>
    </ul>
    <ul class="list">
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fansLists: []
    };
  },
  created() {
    this.getFansList();
  },
  methods: {
    getFansList() {
      this.axios
        .get(
          'https://api.zymk.cn/app_api/v5/gift_effectslist/?comic_id=3835&rows=10&page=1'
        )
        .then(res => {
          console.log(res.data.data);
          this.fansLists = res.data.data.map(item => {
            return {
              formatUid: this.formatUid(item.uid),
              uname: item.uname,
              amount: item.amount
            };
          });
          console.log(this.fansLists);
        });
    },
    getAvator() {
      this.axios
        .get(
          'http://api.kele8.cn/agent/https://image.zymkcdn.com/file/head/022/198/795.jpg'
        )
        .then(res => {
          console.log(res);
        });
    },
    formatUid(id) {
      // console.log('formatUid', id);
      if (id) {
        id = id.toString();
        return (
          '0' + id.substr(0, 2) + '/' + id.substr(2, 3) + '/' + id.substr(5)
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.influence-content {
  width: 100%;
  .rank {
    height: 127px;
    display: flex;
    text-align: center;
    li {
      flex: 1 1 33.3%;
      img {
        border-radius: 50%;
        width: 75px;
        height: 75px;
      }
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
  }
}
</style>
