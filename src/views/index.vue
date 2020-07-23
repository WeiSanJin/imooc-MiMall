<!-- eslint-disable -->
<template>
  <transition name="slide">
    <div class="index">
      <div class="container">
        <div class="swiper-box">
          <div class="nav-menu">
            <ul class="menu-wrap">
              <li class="menu-item">
                <a href="javascript:;">手机 电话卡</a>
                <div class="children">
                  <ul v-for="(item, index) in menuList" :key="index">
                    <li v-for="(sub, index) in item" :key="index">
                      <a :href="sub ? '/#/product/' + sub.id : '#'">
                        <img v-lazy="sub ? sub.img : '/imgs/item-box-1.png'" :alt="sub.name" />
                        {{ sub ? sub.name : "小米9" }}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="menu-item">
                <a href="javascript:;">电视 盒子</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">笔记本 平板</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">家电 插线板</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">出行 穿戴</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">智能 路由器</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">电源 配件</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">生活 箱包</a>
              </li>
            </ul>
          </div>
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in slideList" :key="index">
              <a :href="'/#/product/' + item.id">
                <img :src="item.img" />
              </a>
            </swiper-slide>
            <!-- 分页器 -->
            <div class="swiper-pagination" slot="pagination"></div>
            <!-- 导航按钮 -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="ads-box">
          <a :href="'/#/product/' + item.id" v-for="(item, index) in adsList" :key="index">
            <img v-lazy="item.img" :alt="index" />
          </a>
        </div>
        <div class="banner">
          <a href="/#/product/30">
            <img v-lazy="'/imgs/banner-1.png'" alt="banner" />
          </a>
        </div>
      </div>
      <div class="product-box">
        <div class="container">
          <h2>手机</h2>
          <div class="wrapper">
            <div class="banner-left">
              <a href="/#/product/35">
                <img v-lazy="'/imgs/mix-alpha.jpg'" alt="banner-left" />
              </a>
            </div>
            <div class="list-box">
              <div class="list" v-for="(arr, i) in phoneList" :key="i">
                <div class="item" v-for="(item, index) in arr" :key="index">
                  <span
                    :class="{ 'new-pro': item.price > 1000,'kill-pro': item.price < 1000}"
                  >{{ salesPro(item.price) }}</span>
                  <div class="item-img">
                    <img v-lazy="item.mainImage" alt />
                  </div>
                  <div class="item-info">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.subtitle }}</p>
                    <p class="price" @click="addCart(item.id)">{{ item.price }}元</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <service-bar></service-bar>
      <!-- 模态框 -->
      <modal
        title="提示"
        sureText="查看购物车"
        btnType="1"
        modalType="middle"
        :showModal="showModals"
        @submit="goToCart"
        @cancel="closeModal"
      >
        <template v-slot:body>
          <p>商品添加成功！</p>
        </template>
      </modal>
    </div>
  </transition>
</template>

<script>
import ServiceBar from "./../components/ServiceBar";
import Modal from "./../components/Modal";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "index",
  components: {
    ServiceBar,
    Modal,
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        //自动播放
        autoplay: {
          disableOnInteraction: false, //手动滑动之后不打断播放
          delay: 2000
        },
        loop: true,
        effect: "cube",
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      slideList: [
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg"
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.jpg"
        },
        {
          id: "46",
          img: "/imgs/slider/slide-3.jpg"
        },
        {
          id: "",
          img: "/imgs/slider/slide-4.jpg"
        },
        {
          id: "",
          img: "/imgs/slider/slide-5.jpg"
        }
      ],
      menuList: [
        [
          {
            id: "30",
            img: "/imgs/item-box-1.png",
            name: "小米CC9"
          },
          {
            id: "31",
            img: "/imgs/item-box-2.png",
            name: "小米8青春版"
          },
          {
            id: "32",
            img: "/imgs/item-box-3.jpg",
            name: "Redmi K20 Pro"
          },
          {
            id: "33",
            img: "/imgs/item-box-4.jpg",
            name: "移动4G专区"
          }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      adsList: [
        {
          id: 33,
          img: "/imgs/ads/ads-1.png"
        },
        {
          id: 48,
          img: "/imgs/ads/ads-2.jpg"
        },
        {
          id: 45,
          img: "/imgs/ads/ads-3.png"
        },
        {
          id: 47,
          img: "/imgs/ads/ads-4.jpg"
        }
      ],
      phoneList: [],
      showModals: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化商品列表
    init() {
      this.axios
        .get("/products", {
          params: {
            cartgoryId: 100012,
            pageSize: 18
          }
        })
        .then(res => {
          this.phoneList = [res.list.slice(10, 14), res.list.slice(14, 18)];
        });
    },
    // 新品、秒杀icon
    salesPro(val) {
      return val > 1000 ? "新品" : "秒杀";
    },
    // 添加购物车
    addCart(id) {
      this.axios
        .post("/carts", {
          productId: id,
          selected: true
        })
        .then(res => {
          this.showModals = true;
          this.$store.dispatch("saveCartCount", res.cartTotalQuantity);
        })
        .catch(() => {});
    },
    goToCart() {
      this.$router.push("/cart");
    },
    closeModal() {
      this.showModals = false;
    }
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      box-sizing: border-box;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color: #55585a7a;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            display: block;
            position: relative; //相对定位
            font-size: 16px;
            color: $colorG;
            padding-left: 30px;
            &:after {
              position: absolute; // 绝对定位
              right: 30px;
              top: 17.5px;
              content: " ";
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              // 鼠标移动到商品分类显示商品列表
              display: block;
            }
          }
          .children {
            display: none; // 默认隐藏分类列表
            position: absolute;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;
            ul {
              display: flex;
              justify-content: space-between; // 两边对齐
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
              }
              a {
                color: $colorB;
                font-size: 14px;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle; // 居中
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 196px;
    }
  }
  .banner {
    margin-bottom: 50px;
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex; // 弹性布局
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0px;
          }
          .item {
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              color: $colorG;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              img {
                width: 100%;
                height: 195px;
              }
            }
            .item-info {
              h3 {
                font-size: $fontJ;
                color: $colorB;
                line-height: $fontJ;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }
              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;
                &:after {
                  @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                  content: " ";
                  margin-right: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
