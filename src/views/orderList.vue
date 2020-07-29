<template>
  <div class="order-list">
    <order-header title="订单列表">
      <span slot="tip">请谨防钓鱼链接或诈骗电话，了解更多</span>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="order" v-for="(item, index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{ item.createTime }}
                <span>|</span>
                {{ item.receiverName }}
                <span>|</span>
                订单号：{{ item.orderNo }}
                <span>|</span>
                {{ item.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">
                  <countTo
                    :startVal="0"
                    :endVal="item.payment"
                    :duration="1500"
                  ></countTo>
                </span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(VoList, index) in item.orderItemVoList"
                  :key="index"
                >
                  <div class="good-img">
                    <img
                      v-lazy="VoList.productImage"
                      :alt="VoList.productName"
                    />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{ VoList.productName }}</div>
                    <div class="p-money">
                      <countTo
                        :startVal="0"
                        :endVal="VoList.currentUnitPrice"
                        :duration="1500"
                      ></countTo
                      >元 X
                      <countTo
                        :startVal="0"
                        :endVal="VoList.quantity"
                        :duration="1500"
                      ></countTo>
                    </div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="item.status == 20">
                <a href="javascript:;">{{ item.statusDesc }}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(item.orderNo)">{{
                  item.statusDesc
                }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from "./../components/OrderHeader";
import countTo from "vue-count-to"; // 数字滚动插件

export default {
  name: "order-list",
  components: {
    OrderHeader,
    countTo
  },
  data() {
    return {
      list: [] // 订单列表
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.axios
        .get("/orders", {
          params: {
            pageSize: 5,
            pageNum: 1
          }
        })
        .then(res => {
          this.list = res.list;
        });
    },
    goPay(orderNo) {
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo
        }
      });
      // 三种路由跳转方式
      /*this.$router.push({
        name: "order-pay",
        query: {
          orderNo
        }
      });
      this.$router.push('/order/pay');*/
    }
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>
