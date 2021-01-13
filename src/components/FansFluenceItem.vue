<template>
  <div>
    <ul class="list" v-if="ufansLists.length">
      <li class="item" v-for="(fan, index) in filterFansLists" :key="index">
        <span class="index">{{ index + 4 }}</span>
        <van-image
          round
          :src="'https://image.zymkcdn.com/file/head/' + fan.formatUid + '.jpg'"
        ></van-image>
        <span class="uname">{{ fan.uname }}</span>
        <div class="tiny">
          <span class="num">{{ fan.amount }}</span>
          <span class="text">影响力</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      currentIndex: 2
    };
  },
  computed: {
    filterFansLists() {
      return this.ufansLists.filter((item, index) => {
        return index > 2;
      });
    },
    ufansLists: {
      get() {
        return this.$store.state.fansLists.map(item => {
          return {
            formatUid: this.formatUid(item.uid),
            uname: item.uname,
            amount: item.amount
          };
        });
      },
      set(val) {
        this.$store.state.fansLists = val;
      }
    }
  },
  methods: {
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
.ifList {
  margin-top: 50px;
}
.list {
  display: flex;
  flex-flow: column;
}
.item {
  padding: 0 10px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ddd;
}
.index {
  padding-right: 5px;
}
.van-image {
  height: 32px;
  width: 32px;
  margin-right: 4px;
}
.uname {
  flex: 1;
}
.tiny {
  display: flex;
  color: #ddd;
  // text-align: right;
  text-align: center;
  flex-flow: column;
  margin-left: auto;
  .num {
    color: #fc6454;
  }
}
</style>
