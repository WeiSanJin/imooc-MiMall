/**
 * 商城Vuex-mutations
 */
export default {
  saveUserName(state, username) {
    state.userName = username;
  },
  saveCartCount(state, count) {
    state.cartCount = count;
  }
};
