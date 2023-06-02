<!-- LoginView.vue -->
<template>
  <div>
    <form @submit.prevent="submit">
      <div>
        <label>Eメール</label>
        <input type="text" v-model="email" />
      </div>
      <div>
        <label>パスワード</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit">ログイン</button>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import router from "../router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const store = useStore();

    const submit = async () => {
      const form = {
        email: email.value,
        password: password.value,
      };
      console.log(form)
      try {
        await store.dispatch("login", form);
        router.replace({ name: "Home" });
      } catch (error) {
        console.log(error);
      }
    };
    return {
      email,
      password,
      submit,
    };
  },
};
</script>
