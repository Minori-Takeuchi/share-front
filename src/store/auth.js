// store/auth.js
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "../router";
import apiClient from "@/plugins/axios";

const axios = apiClient;

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
          axios.get("/sanctum/csrf-cookie");
        })
        .catch(() => {
          commit("SET_IS_AUTH", false);
          commit("SET_USER", null);
          router.replace({ name: "Login" });
        });
    },
    async logout({ commit }) {
      try {
        await axios.post("/logout");
        commit("SET_IS_AUTH", false);
        commit("SET_USER", null);
        router.replace({ name: "Login" });
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
});
