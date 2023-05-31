// store/auth.js
import axios from "axios";
export default {
  namespaced: true,
  state: {
    isAuth: false,
    user: null,
  },
  getters: {
    isAuth(state) {
      return state.isAuth;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_IS_AUTH(state, value) {
      state.isAuth = value;
    },
    SET_USER(state, value) {
      state.user = value;
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/login", credentials);
      return await dispatch("me");
    },
    async me({ commit }) {
      return await axios
        .get("/api/user")
        .then((response) => {
          commit("SET_IS_AUTH", true);
          commit("SET_USER", response.data);
        })
        .catch(() => {
          commit("SET_IS_AUTH", false);
          commit("SET_USER", null);
        });
    },
  },
};
