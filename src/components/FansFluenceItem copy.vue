<template>
  <div>
    <ul class="list" v-if="fansLists.length">
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
  props: ['fansLists'],
  computed: {
    filterFansLists() {
      return this.fansLists.filter((item, index) => {
        return index > 2;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-flow: column;
  li.item {
    padding: 0 10px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ddd;
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
  }
}
</style>
