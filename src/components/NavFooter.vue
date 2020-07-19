<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="logo-footer" />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <div class="link-list" v-for="(item, index) in linkList" :key="index">
        <a href="http://www.weisanjin.com" target="_blank">{{ item }}</a>
        <span class="link-every" v-show="index != linkList.length - 1">|</span>
      </div>
    </div>
    <div class="copyringht">
      Copyright ©2020
      <span class="domain">weisanjin.com</span> All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-footer",
  data() {
    return {
      linkList: [
        "我的主页",
        "联系我们",
        "帮助中心",
        "意见反馈",
        "代码托管",
        "友情链接"
      ]
    };
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
.footer {
  height: 234px;
  border-top: 4px solid $colorA;
  background-color: $colorB;
  color: $colorD;
  font-size: 16px;
  text-align: center;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    .link-list {
      width: 100px;
      display: inline-block;
      text-align: center;
      a {
        color: $colorD;
        display: inline-block;
      }
      span {
        margin-left: 18px;
      }
      margin-bottom: 13px;
    }
  }
  .copyringht {
    .domain {
      color: $colorA;
    }
  }
}
</style>
