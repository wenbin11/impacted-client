import { createStore } from "vuex";
import { isLogin, currentUser } from './modules/auth';

export default createStore({
    modules: {
        isLogin: isLogin,
        currentUser: currentUser
    },
  mutations: {
    userIsLoggedIn (state, user) {
      /* eslint-disable */
      state.isLogin = true;
      state.currentUser = user;
    },
    userIsLoggedOut (state) {
      /* eslint-disable */
      state.isLogin = false;
      state.currentUser = null;
    }
  }
})