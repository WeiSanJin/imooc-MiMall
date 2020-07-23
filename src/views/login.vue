<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" alt />
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">
              立即注册
              <span>|</span>忘记密码？
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <div class="link-list" v-for="(item, index) in linkList" :key="index">
          <a href="http://www.weisanjin.com" target="_blank">{{ item }}</a>
          <span class="link-every" v-show="index != linkList.length - 1"
            >|</span
          >
        </div>
      </div>
      <p class="copyright">
        Copyright ©2020 weisanjin.com All Rights Reserved.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      userId: "",
      linkList: [
        "我的主页",
        "联系我们",
        "帮助中心",
        "意见反馈",
        "代码托管",
        "友情链接"
      ]
    };
  },
  methods: {
    login() {
      let { username, password } = this;
      this.axios
        .post("/user/login", {
          username,
          password
        })
        .then(res => {
          console.log(res);
          // cookie名称：userId 值：res.id 过期时间：1个月
          this.$cookie.set("userId", res.id, { expires: "1M" });
          // this.$store.dispatch("saveUserName", res.username);
          this.saveUserName(res.username);
          this.$router.push("/index");
        })
        .catch(() => {
          this.username = "";
          this.password = "";
          console.log("用户名不存在");
        });
    },
    ...mapActions(["saveUserName"]),
    register() {
      let random = Math.floor(Math.random() * 6666 + 1);
      this.axios
        .post("/user/register", {
          username: "weisanjin." + random,
          password: "weisanjin." + random,
          email: random + "admin@weisanjin.com"
        })
        .then(() => {
          console.log("注册成功：weisanjin." + random);
          alert("注册成功");
        });
    }
  }
};
</script>

<style lang="scss">
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url("/imgs/login-bg.jpg") no-repeat center;
    .container {
      height: 576px;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        bottom: 29px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: #ff6600;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;
    border-top: 4px solid #ffffff;
    background-color: #ffffff;
    .footer-link {
      a {
        color: #999999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>
