// store/auth.js
import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "../router";
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

export default createStore({
  plugins: [
    createPersistedState({
      key: "auth",
      paths: ["user", "isAuth"],
      storage: window.sessionStorage,
    }),
  ],
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
      await apiClient.post("/login", credentials);
      return await dispatch("me");
    },
    async me({ commit }) {
      return await apiClient
        .get("/api/user")
        .then((response) => {
          commit("SET_IS_AUTH", true);
          commit("SET_USER", response.data);
          apiClient.get("/sanctum/csrf-cookie");
        })
        .catch(() => {
          commit("SET_IS_AUTH", false);
          commit("SET_USER", null);
          router.replace({ name: "Login" });
        });
    },
    async logout({ commit }) {
      try {
        await apiClient.post("/logout");
        commit("SET_IS_AUTH", false);
        commit("SET_USER", null);
        router.replace({ name: "Login" });
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
});
