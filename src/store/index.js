import { createStore } from "vuex";
import { isLogin, currentUser, isAdmin } from './modules/auth';

export default createStore({
  modules: {
    isLogin: isLogin,
    currentUser: currentUser,
    isAdmin: isAdmin,
  },
  mutations: {
    userIsLoggedIn(state, user) {
      /* eslint-disable */
      state.isLogin.isLogin = true;
      state.currentUser = user;
    },
    userIsLoggedOut(state) {
      /* eslint-disable */
      state.isLogin.isLogin = false;
      state.isAdmin.isAdmin = false;
      state.currentUser = null;
    },
    userIsAdmin(state) {
      /* eslint-disable */
      state.isAdmin.isAdmin = true;
    },
  },
});