<template>
  <div class="modify">
    <Nav :path="-1"
      ><h2 slot="center">个人设置</h2>
      <span class="right" slot="right"></span
    ></Nav>
    <ul class="modify-content">
      <li v-for="(item, index) in options" :key="index">
        <div>
          {{ item.title }}
          <span v-if="index == 0"><img :src="item.default" alt=""/></span>
          <span v-if="index != 0 && index != options.length - 1">{{
            item.default
          }}</span>
          <div class="signature" v-if="index == options.length - 1">
            <span></span>
            <p>{{ item.default }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="blank"></div>
    <ul class="modify-content second">
      <li>
        <div>账号绑定 <span></span></div>
      </li>
      <li>
        <div>设置密码 <span></span></div>
      </li>
    </ul>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
export default {
  components: {
    Nav
  },
  data() {
    return {
      options: [
        {
          title: '头像',
          type: 'avator',
          default: 'https://m.zymk.cn/static/images/default/loading.png'
        },
        {
          title: '昵称',
          type: 'name',
          default:
            'mk_' +
            new Date()
              .getTime()
              .toString()
              .substr(0, 8)
        },
        { title: '性别', type: 'sex', default: '男' },
        { title: '地址', type: 'address', default: '来自未知星球~' },
        {
          title: '个人签名',
          type: 'signature',
          default: '这个人很懒，什么都没留下'
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.modify {
  h2 {
    flex: 1;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }
  span.right {
    width: 50px;
  }
  ul.modify-content {
    width: 100%;
    margin-top: 44px;
    li {
      height: 44px;
      border-bottom: 1px solid #eee;
      line-height: 44px;
      padding: 0 15px;
      font-size: 15px;
      div {
        span {
          float: right;
          color: #b3b9b9;
          img {
            width: 25px;
            height: 25px;
            transform: translateY(25%);
          }
          &::after {
            content: '';
            display: inline-block;
            width: 1.5em;
            height: 1.5em;
            margin-left: 10px;
            transform: translateY(25%);
            background: url('../assets/images/tright.png') no-repeat;
            background-size: cover;
            background-position: 50%;
          }
        }
        .signature {
          position: relative;
          flex-flow: column;
          span {
            position: absolute;
            top: -44px;
            right: 0;
          }
          p {
            font-size: 13px;
            color: #b3b9b9;
          }
        }
      }
      &:last-of-type {
        height: auto;
      }
    }
  }
  .blank {
    height: 30px;
    background-color: #efefef;
  }
  ul.modify-content.second {
    margin-top: 0;
  }
}
</style>
