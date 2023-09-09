import { createStore } from "vuex";
import isLogin from './modules/isUserLogin';

export default createStore({
    modules: {
        isLogin: isLogin
    },
  mutations: {
    userIsLoggedIn (state) {
      /* eslint-disable */
      state.isLogin = true;
    },
    userIsLoggedOut (state) {
      /* eslint-disable */
      state.isLogin = false;
    }
  }
})