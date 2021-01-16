<template>
  <div class="login">
    <Nav :path="-1"
      ><h2 slot="center">登录</h2>
      <span class="right" slot="right"></span
    ></Nav>
    <div class="avatarBox">
      <img
        class="avatar"
        src="https://m.zymk.cn/static/images/default/login.png"
        alt=""
      />
      <img
        class="login_bananer"
        src="https://m.zymk.cn/static/images/default/login_bananer1.png"
        alt=""
      />
    </div>
    <div class="input-area">
      <div class="username">
        <span
          class="iconfont icon-xiaoniao
        "
        ></span>
        <input type="text" placeholder="请输入手机号码" />
      </div>
      <div class="vc-input">
        <span
          class="iconfont icon-lock
        "
        ></span>
        <input type="text" placeholder="请输入短信验证码" />
        <div class="getVc">发送验证码</div>
      </div>
    </div>
    <div class="login-box">登录</div>
    <div class="switchLogin">
      <span>使用密码登录 (漫客星球用户)</span>
    </div>
    <div class="anothers">
      <div class="tip_1">使用第三方账号登录</div>
      <ul class="loginIcons">
        <li>
          <div class="iconItem">
            <span class="iconfont icon-weibo"></span>
          </div>
        </li>
        <li>
          <div class="iconItem">
            <span class="iconfont icon-qq"></span>
          </div>
        </li>
      </ul>
      <div class="tip_2">登录代表你已阅读并同意<i>《天天漫画用户协议》</i></div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
export default {
  components: {
    Nav
  }
};
</script>

<style lang="less" scoped>
.login {
  text-align: center;
  h2 {
    flex: 1;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }
  .right {
    width: 50px;
  }
  .avatarBox {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    margin-top: 44px;
    height: 171px;
    flex-flow: column;
    align-items: center;
    img.avatar {
      margin: 20px 0;
      width: 91px;
      height: 91px;
    }
    .login_bananer {
      width: 100%;
    }
  }
  .input-area {
    padding: 15px 30px 20px;
    .username,
    .vc-input {
      display: flex;
      align-items: center;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #d5d5d5;
      i,
      span {
        text-align: center;
        display: inline-block;
        width: 48px;
        line-height: 48px;
        height: 48px;
        color: #fc6454;
      }
      .iconfont {
        font-size: 36px;
        &.icon-lock {
          font-size: 30px;
        }
      }
      input {
        flex: 1;
        padding: 15px 0;
        border: none;
        outline: none;
        &::-webkit-input-placeholder {
          color: #d5d5d5;
        }
      }
      .getVc {
        width: 80px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        padding: 0 4px;
        color: #fc6454;
        border: 1px solid #fc6454;
        border-radius: 3px;
      }
    }
  }
  .login-box {
    height: 44px;
    border-radius: 2px;
    border: 1px solid #fc6454;
    margin: 20px 30px;
    font-size: 14px;
    color: #fc6454;
    text-align: center;
    line-height: 44px;
  }
  .switchLogin {
    color: #fc6454;
  }
  .anothers {
    display: flex;
    padding: 10px 0;
    justify-content: space-around;
    // flex-flow: column;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 182px;
    .loginIcons {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      width: 100%;
      height: 48px;
      padding: 0 30px;
      li {
        width: 105px;
        display: flex;
        justify-content: center;
        .iconItem {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid #fc6454;
          .iconfont {
            font-size: 24px;
            color: #fc6454;
            line-height: 48px;
          }
        }
      }
    }
    .tip_2 {
      color: #d5d5d5;
      i {
        color: #333;
        font-style: normal;
      }
    }
  }
}
</style>
