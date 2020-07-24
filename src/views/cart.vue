<template>
  <div class="cart">
    <order-header title="我的购物车">
      <span slot="tip"
        >温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span
      >
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span
                class="checkbox"
                v-bind:class="{ checked: allChecked }"
                @click="toggleAll"
              ></span
              >全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item, index) in list" :key="index">
              <div class="item-check">
                <span
                  class="checkbox"
                  :class="{ checked: item.productSelected }"
                  @click="updataCart(item)"
                ></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt />
                <span>{{
                  item.productName + " , " + item.productSubtitle
                }}</span>
              </div>
              <div class="item-price">{{ item.productPrice }}元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updataCart(item, '-')">—</a>
                  <!-- v-on:input（当输入框数值改变时触发函数） -->
                  <input
                    type="text"
                    v-model.number="item.quantity"
                    v-on:input="updataCart(item, '+|-')"
                    onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                    onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                  />
                  <a href="javascript:;" @click="updataCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total">
                <!-- startVal：开始数值，endVal：结束数值，duration：持续时间，以毫秒为单位 -->
                <countTo
                  :startVal="0"
                  :endVal="item.productTotalPrice"
                  :duration="1000"
                ></countTo
                >元
              </div>
              <div class="item-del" @click="openModal(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共
            <span>{{ list.length }}</span
            >件商品，已选择 <span>{{ checkedNum }}</span
            >件
          </div>
          <div class="total fr">
            合计：
            <span>
              <countTo
                :startVal="0"
                :endVal="cartTotalPrice"
                :duration="1000"
              ></countTo> </span
            >元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
    <!-- 模态框 -->
    <modal
      title="提示"
      sureText="确定"
      btnType="3"
      modalType="middle"
      :showModal="showModal"
      @submit="delProduct()"
      @cancel="showModal = false"
    >
      <template v-slot:body>
        <p>
          您确定要删除{{
            delProductInof.productName +
              " , " +
              delProductInof.productSubtitle +
              "！"
          }}
        </p>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from "./../components/OrderHeader";
import ServiceBar from "./../components/ServiceBar";
import NavFooter from "./../components/NavFooter";
import Modal from "./../components/Modal";
import countTo from "vue-count-to"; // 数字滚动插件

export default {
  name: "cart",
  components: {
    OrderHeader,
    ServiceBar,
    NavFooter,
    Modal,
    countTo
  },
  data() {
    return {
      list: [], // 商品列表
      allChecked: false, // 是否全选
      cartTotalPrice: 0, // 商品总金额
      checkedNum: 0, // 选中商品数量
      showModal: false, // 控制模态框显示隐藏
      delProductInof: "" // 待删除商品
    };
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    // 获取购物车列表
    getCartList() {
      this.axios.get("/carts").then(res => {
        this.renderData(res);
      });
    },
    // 控制购物车全选功能
    toggleAll() {
      let url = this.allChecked ? "/carts/unSelectAll" : "/carts/selectAll";
      this.axios.put(url).then(res => {
        this.renderData(res);
      });
    },
    // 公共赋值
    renderData(res) {
      this.list = res.cartProductVoList || [];
      this.allChecked = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      this.checkedNum = this.list.filter(item => item.productSelected).length;
    },
    // 更新购物车数量和购物车单选状态
    updataCart(item, type) {
      let quantity = item.quantity,
        selected = item.selected;
      // 通过点击"-"按钮减少一件商品,当商品剩下1件时再次点击提示用户。
      if (type == "-") {
        if (quantity == 1) {
          alert("商品至少保留一件!");
          return;
        }
        --quantity;
        // 通过点击"+"按钮增加一件商品,当商品大于库存时提示用户。
      } else if (type == "+") {
        if (quantity > item.productStock) {
          alert("当前商品库存数量不足！");
          return;
        }
        ++quantity;
        // 通过输入框修改商品数量，当输入非法数值时提示用户
      } else if (type == "+|-") {
        if (typeof item.quantity != "number") {
          this.list.map(index => {
            if (item.productId == index.productId) {
              index.quantity = 1;
            }
          });
          alert("请输入正确数量！");
          return;
        }
        // 当函数第二个参数为空时，更新商品选中状态
      } else {
        selected = !item.productSelected;
      }
      this.axios
        .put(`/carts/${item.productId}`, {
          quantity,
          selected
        })
        .then(res => {
          this.renderData(res);
        });
    },
    // 删除购物车商品
    delProduct() {
      let productId = this.delProductInof.productId;
      this.axios
        .delete(`/carts/${productId}`, {
          productId
        })
        .then(res => {
          this.showModal = false;
          this.renderData(res);
        });
    },
    // 显示模态框
    openModal(item) {
      this.delProductInof = item;
      this.showModal = true;
    },
    // 结算
    order() {
      /* every()方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
      注意：若收到一个空数组，此方法在一切情况下都会返回 true。*/
      let isCheck = this.list.every(item => !item.productSelected);
      if (isCheck) {
        alert("您还没选择商品");
      } else {
        this.$router.push("/order/confirm");
      }
    }
  }
};
</script>
<style lang="scss">
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url("/imgs/icon-gou.png") #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        font-weight: bold;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          font-weight: bold;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 15px;
            text-align: left;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              input {
                display: inline-block;
                border: 1px solid #e5e5e5;
                text-align: center;
                width: 50px;
                height: 100%;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url("/imgs/icon-close.png") no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
