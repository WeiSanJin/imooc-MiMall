<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
    this.getUser();
    this.getCartCount();
  },
  methods: {
    getUser() {
      this.axios.get("/user").then(() => {
        // to-do 保存到Vuex里面
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then(() => {
        // to-do 保存到Vuex里面
      });
    }
  }
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
</style>
