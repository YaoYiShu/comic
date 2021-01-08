<template>
  <van-swipe
    class="my-swipe reset-swipe"
    :width="115"
    :loop="false"
    :show-indicators="false"
  >
    <van-swipe-item v-for="(item, index) in recommend" :key="index">
      <!-- :gutter="10" -->
      <van-grid>
        <VanImage
          :item="item"
          :index="index"
          :score="recommend[index].score"
          :isDetails="true"
        ></VanImage>
        <p class="comic_name">
          {{ item.comic_name }}
        </p>
        <p class="content">{{ item.comic_feature }}</p>
      </van-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import VanImage from '@/components/VanImage';
export default {
  data() {
    return {
      isDetails: true
    };
  },
  components: {
    VanImage
  },
  props: ['recommend']
};
</script>

<style lang="less" scoped>
.van-grid {
  padding-right: 10px;
}
img {
  width: 100%;
  height: 100%;
}
.icon-xing {
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  padding: 0 3px 0 8px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px 0 0 10px;
  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('../assets/images/xing.png') no-repeat;
    background-size: 100%;
    margin-right: 2px;
    background-position: bottom center;
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
  color: #999;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
