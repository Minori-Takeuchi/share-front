// store/auth.js
import { createStore } from "vuex";
import axios from "axios";
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});
apiClient.defaults.withCredentials = true;

export default createStore({
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
      await apiClient.get("/sanctum/csrf-cookie");
      await apiClient.post("/api/login", credentials);
      return await dispatch("me");
    },
    async me({ commit }) {
      return await apiClient
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
})
