<template>
  <ol class="update-list">
    <li
      class="item"
      v-for="(item, index) in list"
      :key="item.comic_id"
      @click="
        !isComicDetails
          ? $router.push({
              path: '/comicDetails',
              query: { id: item.comic_id }
            })
          : ''
      "
    >
      <div class="thumb">
        <img
          :src="
            'http://image.zymkcdn.com/file/cover/000/00' +
              formatId(item.comic_id) +
              '_2_1.jpg-720x360.jpg'
          "
          alt=""
        />
        <div class="hot">{{ formatClickCount(item.hot) }}</div>
      </div>
      <div class="content">
        <h3>
          {{ item.comic_name }}
          <!-- <span class="tag">{{ item.comic_type[0].name }}</span> -->
          <van-tag round plain :color="color[index % color.length]">{{
            item.comic_type[0].name
          }}</van-tag>
          <i class="author_name">{{ item.author_name }}</i>
        </h3>
        <div>
          <span class="comic_feature">{{ item.comic_feature }}</span>
          <i class="last_chapter">
            更新至
            <b>{{ item.last_chapter.name }}</b>
          </i>
        </div>
      </div>
    </li>
  </ol>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      color: ['#c78590', '#f3bd7e', '#6ec4e9', '#66c9bb', '#9b9bd5'],
      isComicDetails: false
    };
  },

  methods: {
    formatClickCount: function(value) {
      let k = 10000;
      let sizes = ['', '万', '亿', '万亿'];
      if (value < k) {
        return value;
      } else {
        let i = Math.floor(Math.log(value) / Math.log(k));
        value = (value / Math.pow(k, i)).toFixed(0);
        return value + sizes[i];
      }
    },
    formatId(id) {
      id = id.toString();
      if (id.length == 4) return id.substr(0, 1) + '/' + id.substr(1);
      if (id.length == 3) return '0/' + id;
      if (id.length == 2) return '0/0' + id;
      if (id.length == 1) return '0/00' + id;
    }
  }
};
</script>

<style lang="less" scoped>
.update-list {
  width: 100%;
  li.item {
    .thumb {
      position: relative;
      img {
        height: 52vw;
      }
      .hot {
        position: absolute;
        bottom: 15px;
        right: 10px;
        line-height: 18px;
        padding: 1px 7px;
        border-radius: 15px;
        color: #ddd;
        transform: scale(0.95);
        background-color: rgba(0, 0, 0, 0.5);
        &::before {
          content: '';
          width: 1em;
          height: 1em;
          display: inline-block;
          background: url('../assets/images/fire1.png') no-repeat;
          background-size: cover;
          background-position: 50%;
          transform: translateY(10%);
        }
      }
    }
    .content {
      padding: 0 8px;
      h3 {
        font-size: 16px;
      }
      .van-tag {
        padding: 0px 5px;
      }
      .author_name {
        float: right;
        font-style: normal;
        font-size: 12px;
        transform: translateY(25%);
        color: rgb(212, 211, 211);
      }
      div {
        display: flex;
        color: rgb(212, 211, 211);
        padding: 5px 0;
        .comic_feature {
          flex: 1;
          display: inline-block;
          transform: scale(0.95);
          transform-origin: left;
          -webkit-line-clamp: 1;
          overflow: hidden;
          white-space: nowrap;
        }
        .last_chapter {
          text-align: right;
          width: 40%;
          font-style: normal;
          transform: scale(0.95);
          transform-origin: right;
          white-space: nowrap;
          -webkit-line-clamp: 1;
          overflow: hidden;
          // text-overflow: ellipsis;
          b {
            font-weight: normal;
            color: #fc6454;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
