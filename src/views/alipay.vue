<template>
  <div class="ali-pay">
    <loading v-if="loading"></loading>
    <div class="from" v-html="content"></div>
  </div>
</template>

<script>
import Loading from "./../components/Loading";
export default {
  name: "alipay",
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: "",
      loading: true
    };
  },
  mounted() {
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      this.axios
        .post("/pay", {
          orderId: this.orderId,
          orderName: "Vue高仿小米商城",
          amount: 0.01,
          payType: 1
        })
        .then(res => {
          // 支付宝支付：content是html源码，渲染到页面上后自动跳转到支付页面
          this.content = res.content;
          setTimeout(() => {
            document.forms[0].submit();
          }, 100);
        });
    }
  },
  components: {
    Loading
  }
};
</script>
