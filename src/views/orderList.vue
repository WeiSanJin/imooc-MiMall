<template>
  <div class="order-list">
    <order-header title="订单列表">
      <span slot="tip">请谨防钓鱼链接或诈骗电话，了解更多</span>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="showLoading"></loading>
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

              <div class="good-state-box">
                <div class="good-state-65 fr" v-if="item.status != 10">
                  <a href="javascript:;">{{ item.statusDesc }}</a>
                </div>
                <div class="good-state fr" v-else>
                  <a href="javascript:;" @click="goPay(item.orderNo)">
                    {{ item.statusDesc }}
                  </a>
                </div>
                <div class="good-state fr good-gray" v-if="item.status == 10">
                  <a href="javascript:;" @click="cancelOrderModal(item.orderNo)"
                    >取消订单</a
                  >
                </div>
              </div>
            </div>
          </div>
          <el-pagination
            v-if="!showLoading"
            class="pagination"
            background
            layout="sizes,prev, pager, next,jumper"
            :pageSize="pageSize"
            :pageSizes="pageSizes"
            :total="total"
            @current-change="handleChange"
            @size-change="sizeChange"
          ></el-pagination>
          <no-data v-if="!showLoading && list.length == 0"></no-data>
        </div>
      </div>
    </div>
    <modal
      title="信息提示"
      btnType="3"
      :showModal="showCancelModal"
      @cancel="showCancelModal = false"
      @submit="cancelOrder"
    >
      <template v-slot:body>
        <p>您确认要取消当前订单吗？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from "./../components/OrderHeader";
import Loading from "./../components/Loading";
import NoData from "./../components/NoData";
import Modal from "./../components/Modal";
import countTo from "vue-count-to"; // 数字滚动插件
import { Pagination } from "element-ui"; // 分页器

export default {
  name: "order-list",
  components: {
    OrderHeader,
    Loading,
    NoData,
    Modal,
    countTo,
    [Pagination.name]: Pagination
  },
  data() {
    return {
      showLoading: true, // 是否显示loading
      showCancelModal: false, // 取消订单信息模态框
      orderNo: "", // 订单号
      list: [], // 订单列表
      pageSize: 5, // 一页显示多少条数据
      pageNum: 1, // 当前在第几页
      total: 0, // 总共有多少条数据
      pageSizes: [1, 2, 5, 8, 10, 20] // 每页显示个数选择器的选项设置
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    // 初始化数据列表
    getOrderList() {
      this.axios
        .get("/orders", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        })
        .then(res => {
          this.showLoading = false; // 当数据加载完成不显示loading效果
          this.list = res.list; // 获取列表
          this.total = res.total; // 获取数据总条数
        })
        .catch(() => {
          this.showLoading = false;
        });
    },
    // 订单列表中未支付的订单，可以点击跳转至订单支付页面进行支付
    goPay(orderNo) {
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo
        }
      });
    },
    // 显示取消订单提示模态框
    cancelOrderModal(orderNo) {
      this.orderNo = orderNo;
      this.showCancelModal = true;
    },
    // 取消订单
    cancelOrder() {
      this.axios
        .put(`/orders/${this.orderNo}`, {
          orderNo: this.orderNo
        })
        .then(() => {
          this.showCancelModal = false; // 关闭取消订单提示模态框
          this.getOrderList(); // 重新渲染订单列表
        });
    },
    // 分页器当前页发生变化触发
    handleChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },
    // 分页器每页条数发生变化触发
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getOrderList();
    }
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/element-variables.scss";

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
        .pagination {
          text-align: right;
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
          .good-state-box {
            margin-top: 43px;
            .good-state {
              @include height(30px);
              font-size: 20px;
              color: $colorA;
              a {
                color: $colorA;
              }
            }
            .good-state-65 {
              @include height(65px);
              font-size: 20px;
              color: $colorA;
              a {
                color: $colorA;
              }
            }
            .good-gray {
              a {
                color: $colorD;
              }
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
