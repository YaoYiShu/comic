<template>
  <div
    @click="
      !isComicDetails
        ? $router.push({
            path: '/comicDetails',
            query: { id: item.comic_id }
          })
        : ''
    "
    style="border-radius:5px"
  >
    <van-image
      :class="{ more: ismore }"
      :src="
        'https://image.zymkcdn.com/file/cover/000/00' +
          formatId(item.comic_id) +
          '.jpg'
      "
    >
      <!-- 分数 -->
      <span class="icon-xing" v-if="score">{{ score | pingfen }}</span>
      <span class="icon-xing" v-if="book">{{
        book.comic_info[index].pingfen | pingfen
      }}</span>
    </van-image>
  </div>
</template>

<script>
export default {
  props: [
    'item',
    'book',
    'index',
    'ismore',
    'score',
    'isComicDetails',
    'isDetails'
  ],
  filters: {
    pingfen(value) {
      if (!value) return '';
      value = parseInt(value).toString();
      if (value.length === 2) {
        return value.substr(0, 1) + '.' + value.substr(1);
      }
      if (value.length === 3) {
        return value.substr(0);
      }
    }
  },
  methods: {
    formatId(id) {
      if (id) {
        // console.log(id.length);
        if (typeof id != 'string') {
          id = id.toString();
        }
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
    }
  }
};
</script>

<style lang="less" scoped>
.van-image.details {
  position: relative;
  margin-right: 10px;
  width: 98px;
  height: 130px;
}
.van-image.more {
  position: relative;
  margin-right: 10px;
  width: 60px;
  height: 80px;
}
.van-image.comic-details {
  position: relative;
  margin-right: 10px;
  width: 60px;
  height: 80px;
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
</style>
