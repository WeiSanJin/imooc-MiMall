<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="userName">{{ userName }}</a>
          <a href="javascript:;" v-if="!userName" @click="login">登录</a>
          <a href="javascript:;" v-if="userName">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goTocart">
            <span class="icon-cart"></span>
            购物车({{ cartCount }})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="(item, index) in phoneList"
                  :key="index"
                >
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="(item, index) in mobileMenu"
                  :key="index"
                >
                  <a href target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.img" alt />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "nav-header",
  data() {
    return {
      mobileMenu: [
        {
          id: 1,
          img: "/imgs/nav-img/nav-3-1.jpg",
          name: "小米壁画电视 65英寸",
          price: "6999元"
        },
        {
          id: 2,
          img: "/imgs/nav-img/nav-3-2.jpg",
          name: "小米全面屏电视E55A",
          price: "1999元"
        },
        {
          id: 3,
          img: "/imgs/nav-img/nav-3-3.jpg",
          name: "小米电视4A 32英寸",
          price: "699元"
        },
        {
          id: 4,
          img: "/imgs/nav-img/nav-3-4.jpg",
          name: "小米电视4A 55英寸",
          price: "1799元"
        },
        {
          id: 5,
          img: "/imgs/nav-img/nav-3-5.jpg",
          name: "小米电视4A 65英寸",
          price: "2699元"
        },
        {
          id: 6,
          img: "/imgs/nav-img/nav-3-6.jpg",
          name: "查看全部",
          price: "小米电视"
        }
      ],
      TVMenu: [
        {
          id: 1,
          img: "/imgs/nav-img/nav-1.png",
          name: "小米CC9",
          price: "1799.00元"
        },
        {
          id: 2,
          img: "/imgs/nav-img/nav-2.png",
          name: "小米CC9e",
          price: "1299.00元"
        },
        {
          id: 3,
          img: "/imgs/nav-img/nav-3.png",
          name: "小米CC9 美图定制版",
          price: "2599.00元"
        },
        {
          id: 4,
          img: "/imgs/nav-img/nav-4.png",
          name: "小米9",
          price: "2599.00元"
        },
        {
          id: 5,
          img: "/imgs/nav-img/nav-5.png",
          name: "小米9 Pro 5G",
          price: "3699.00元"
        },
        {
          id: 6,
          img: "/imgs/nav-img/nav-6.png",
          name: "小米MIX Alpha",
          price: "19999.00元"
        }
      ],
      phoneList: []
    };
  },
  computed: {
    // userName() {
    //   return this.$store.state.username;
    // },
    // cartCount() {
    //   return this.$store.state.cartCount;
    // }
    ...mapState(["userName", "cartCount"])
  },
  filters: {
    // 过滤器
    currency(val) {
      if (!val) return "0.00";
      return "￥" + val.toFixed(2) + "元";
    }
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    getProductList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012",
            pageSize: 6
          }
        })
        .then(res => {
          if (res.list.length >= 6) {
            this.phoneList = res.list.slice(0, 6);
          }
        });
    },
    goTocart() {
      this.$router.push("/cart");
    },
    login() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #ffffff;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
      .header-logo {
        display: inline-block;
        width: 55px;
        height: 55px;
        background-color: #ff6600;
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          &:before {
            content: "";
            @include bgImg(55px, 55px, "/imgs/mi-logo.png", 55px);
            transition: margin 0.2s;
          }
          &:after {
            content: "";
            @include bgImg(55px, 55px, "/imgs/mi-home.png", 55px);
          }
          &:hover:before {
            margin-left: -55px;
            transition: margin 0.2s;
          }
        }
      }
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            transition: all 0.5s;
            background-color: $colorG;
            .product {
              position: relative; // 绝对定位
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              a {
                display: inline-block;
              }
              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
              &:before {
                content: "";
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }
              &:last-child:before {
                display: none;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          input {
            border: none;
            box-sizing: border-box;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
          }
          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>
