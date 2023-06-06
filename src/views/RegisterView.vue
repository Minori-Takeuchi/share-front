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
      <button type="submit">ユーザー登録</button>
    </form>
  </div>
</template>
<script>
import apiClient from "@/plugins/axios";

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
        await axios.get("/sanctum/csrf-cookie");
        const response = await axios.post("/register", this.form);
        if (!response) {
          console.log('create error')
          alert('作成に失敗しました')
        }
        console.log(response)
        this.$router.replace({ name: "Login" });
      } catch (error) {
        console.log(error)
        alert('作成に失敗しました')
      }
    },
  },
};
</script>
