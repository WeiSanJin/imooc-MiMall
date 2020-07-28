import Vue from "vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import VueLazyLoad from "vue-lazyload";
import VueCookie from "vue-cookie";
import { Message, Notification } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store";
// import env from "./env.js";

Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
  loading: "/imgs/loading-svg/loading-bars.svg"
});
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.config.productionTip = false;

// 根据前端的跨域方式做调整
axios.defaults.baseURL = "/api";
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
// eslint-disable-next-line
axios.interceptors.response.use((response) => {
    let res = response.data;
    let path = location.hash;
    if (res.status == 0) {
      return res.data;
    } else if (res.status == 10) {
      if (path != "#/index") {
        window.location.href = "/#/login";
      }
      return new Promise(resolve => {
        Vue.prototype.$notify({
          title: "错误信息",
          dangerouslyUseHTMLString: true,
          message: "<br><h3>敲你妈，没登录我怎么知道你购物车有什么？</h3>",
          type: "error"
        });
        resolve("未登录");
      });
    } else {
      return new Promise(resolve => {
        Vue.prototype.$notify({
          title: "错误信息",
          dangerouslyUseHTMLString: true,
          message: res.msg,
          type: "error"
        });
        resolve(res.msg);
      });
    }
  },
  error => {
    let res = error.response;
    return new Promise(resolve => {
      Vue.prototype.$notify({
        title: "错误信息",
        dangerouslyUseHTMLString: true,
        message: `<br><h3>${res.data.message}</h3>`,
        type: "error"
      });
      resolve(res.msg);
    });
  }
);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
