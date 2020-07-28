<template>
  <div>
    <order-header title="订单列表">
      <span slot="tip">请谨防钓鱼链接或诈骗电话，了解更多</span>
    </order-header>
  </div>
</template>

<script>
import OrderHeader from "./../components/OrderHeader";

export default {
  name: "order-list",
  components: {
    OrderHeader
  }
};
</script>
