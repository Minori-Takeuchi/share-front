<!-- RegisterView.vue -->
<template>
  <div>
    <form @submit.prevent="register">
      <div>
        <label>名前</label>
        <input type="text" v-model="form.name" />
      </div>
      <div>
        <label>Eメール</label>
        <input type="text" v-model="form.email" />
      </div>
      <div>
        <label>パスワード</label>
        <input type="password" v-model="form.password" />
      </div>
      <button type="submit">ログイン</button>
    </form>
  </div>
</template>
<script>
import apiClient from '@/plugins/axios';

const axios = apiClient;

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        await axios.post("/register", this.form);
        this.$router.replace({ name: "Login" });
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          alert("新規作成に失敗しました");
        }
      }
    },
  },
};
</script>
