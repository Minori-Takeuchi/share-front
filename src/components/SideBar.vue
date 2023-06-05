<template>
  <div class="sidebar">
    <router-link to="/">Home</router-link>
    <button @click="logout">Logout</button>
    <p>シェア</p>
    <textarea name="comment" id="" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const logout = () => {
      store.dispatch("logout");
    };

    return {
      logout,
    };
  },
};
</script>
