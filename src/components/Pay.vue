<template>
  <div class="pay">
    <Nav :path="-1"
      ><h2 slot="center">充值中心</h2>
      <span class="right" slot="right"></span
    ></Nav>
    <div class="payCon">
      <div class="payhead">
        <div class="payImg">
          <img
            src="https://m.zymk.cn/static/images/default/payislogin.png"
            alt=""
          />
        </div>
        <div class="payInfo">
          <p class="loginTips">
            大人充值需要登录才可以操作哦~<span
              @click.stop="$router.push('/login')"
              >登录</span
            >
          </p>
          <p class="payTips">如充值遇到问题，请联系客服：QQ4006161961</p>
        </div>
      </div>
    </div>
    <div class="blank"></div>
    <ul class="price">
      <!-- v-for="item in charge_products" :key="item.id" -->
      <li
        v-for="(item, index) in charge_products"
        :key="item.id"
        @click.stop="active = index"
        :class="{ active: active == index }"
        :data-gold="item.gold"
      >
        <p class="glod">{{ item.gold }}元宝</p>
        <p class="rmb">(￥{{ item.gold / 100 }})</p>
      </li>
    </ul>
    <div class="blank"></div>
    <ul class="price payMethods">
      <li
        v-for="(item, index) in payMethods"
        :key="index"
        :class="{ active: payActive == index }"
        @click="payActive = index"
      >
        <p><img :src="item.imgUrl" alt="" />{{ item.title }}</p>
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
      charge_products: [],
      active: 0,
      payActive: null,
      payMethods: [
        {
          title: '支付宝支付',
          imgUrl: 'https://m.zymk.cn/static/images/default/icons/ali.png'
        },
        {
          title: '微信支付',
          imgUrl: 'https://m.zymk.cn/static/images/default/icons/wx.png'
        }
      ]
    };
  },
  created() {
    this.getPrice();
  },
  methods: {
    getPrice() {
      this.$jsonp('https://payorder.zymk.cn/app_api/v5/get_charge_products/', {
        callback: 'get_charge_productsCb',
        pay_type: 1
      }).then(res => {
        // console.log(res);
        this.charge_products = res.data;
        // console.log(this.charge_products);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.pay {
  width: 100%;
  height: 100%;
  h2 {
    flex: 1;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }
  .right {
    width: 50px;
  }
  .payCon {
    margin-top: 54px;
    .payhead {
      height: 84px;
      display: flex;
      padding: 0 15px;
      // justify-content: center;
      align-items: center;
      .payImg {
        width: 60px;
        height: 60px;
        margin-right: 15px;
        border-radius: 50%;
        border: 1px solid #333;
      }
      .payInfo {
        line-height: 1.5;
        .loginTips {
          span {
            display: inline-block;
            margin-left: 20px;
            border-radius: 10px;
            border: 1px solid #fc6454;
            color: #fc6454;
            padding: 0 10px;
          }
        }
        .payTips {
          color: #999;
        }
      }
    }
  }
  .blank {
    height: 12px;
    background-color: #f5f5f5;
  }
  .price {
    display: flex;
    padding: 12px 14px;
    flex-wrap: wrap;
    li {
      display: flex;
      flex: 1 1 calc(100% / 2 - 12px);
      align-items: center;
      flex-flow: column;
      justify-content: center;
      text-align: center;
      height: 84px;
      border-radius: 5px;
      border: 1px dashed #b9b9b9;
      // flex: 1 1 50%;
      margin: 0 12px 14px 0;
      &:nth-of-type(2n + 2) {
        margin-right: 0;
      }
      .glod {
        font-size: 18px;
      }
      .rmb {
        font-size: 14px;
      }
      &.active {
        background-color: #fc6454;
        border: none;
        color: #fee;
      }
    }
  }
  .price.payMethods {
    display: flex;
    margin-bottom: 44px;
    li {
      height: 60px;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
    span {
      display: inline-block;
    }
  }
}
</style>
