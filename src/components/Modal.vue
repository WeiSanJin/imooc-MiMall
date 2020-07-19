<!-- eslint-disable  -->
<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{ title }}</span>
          <a href="javascript:;" class="icon-close" @click="cancel()"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a class="btn" href="javascript:;" v-if="btnType == 1" @click="submit()">{{ sureText }}</a>
          <a class="btn" href="javascript:;" v-if="btnType == 2" @click="cancel()">{{ cancelText }}</a>
          <div class="btn-group" v-if="btnType == 3">
            <a href="javascript:;" class="btn" @click="submit()">{{ sureText }}</a>
            <a href="javascript:;" class="btn" @click="cancel()">{{ cancelText }}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    // 弹窗类型:小small、中middle、大large、表单form
    modalType: {
      type: String,
      default: "form"
    },
    // 弹窗标题
    title: String,
    // 按钮类型：1：只有确定按钮  2：取消按钮  3：确定取消按钮
    btnType: String,
    sureText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    showModal: Boolean
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    submit() {
      this.$emit("submit");
    }
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/modal.scss";
</style>
