<template>
  <van-swipe
    class="my-swipe reset-swipe"
    :width="115"
    :loop="false"
    :show-indicators="false"
  >
    <van-swipe-item v-for="(item, index) in book.comic_info" :key="index">
      <!-- :gutter="10" -->
      <van-grid :gutter="10">
        <VanImage :item="item" :book="book" :index="index"></VanImage>
        <p class="comic_name">
          {{ book.comic_info[index].comic_name }}
        </p>
        <p class="content">{{ book.comic_info[index].content }}</p>
      </van-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import VanImage from '@/components/VanImage';
export default {
  components: {
    VanImage
  },
  props: ['book', 'index']
};
</script>

<style lang="less" scoped>
.van-image__img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 5px !important;
}

.my-swipe {
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  .van-swipe-item {
    .van-grid {
      width: 115px !important;
      // margin: 0 10px;
    }
  }
  .comic_name {
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .content {
    font-size: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}
</style>
