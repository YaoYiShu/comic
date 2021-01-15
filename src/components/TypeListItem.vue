<template>
  <!-- v-if="lists" -->
  <div class="type-list-item">
    <!-- url("https://image.zymkcdn.com/file/sort/000/000/005.png") center center / cover no-repeat -->
    <a
      v-for="(list, index) in lists"
      :key="index"
      @click="
        $router.push({
          path: '/sort',
          query: {
            id: list.id,
            name: list.name
          }
        })
      "
    >
      <van-image
        :src="
          'https://image.zymkcdn.com/file/sort/000/000/' +
            formatUrl(list.id) +
            '.png'
        "
      >
        <template v-slot:loading>
          <div class="loading"></div>
        </template>
      </van-image>
      <span>- {{ list.name }} -</span>
    </a>
  </div>
</template>

<script>
export default {
  props: ['lists'],
  methods: {
    formatUrl(id) {
      id = id.toString();
      if (id.length == 1) {
        return '00' + id;
      }
      if (id.length == 2) {
        return '0' + id;
      }
      if (id.length == 3) {
        return id;
      }
    }
  },
  data() {
    return {
      loading: ['http://localhost:8080/loading.png']
    };
  }
};
</script>

<style lang="less" scoped>
.type-list-item {
  z-index: 100;
  background-color: #fff;
  width: 100%;
  padding-top: 60px;
  display: flex;
  flex-wrap: wrap;
  a {
    width: 33.33%;
    display: flex;
    align-items: center;
    flex-flow: column;
    width: 125px;
    height: 100px;
    .van-image {
      border-radius: 50%;
      width: 80px;
      height: 80px;
    }
    span {
      width: 100%;
      height: 20px;
      font-size: 12px;
      color: #999;
    }
  }
}
.loading {
  width: 98px;
  height: 130px;
  &::before {
    content: '';
    display: inline-block;
    width: 98px;
    height: 130px;
    background: url('../assets/images/loading.png') no-repeat;
    background-size: 50%;
    background-position: 50%;
  }
}
</style>
