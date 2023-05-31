<!-- LoginView.vue -->
<template>
  <div>
    <form @submit.prevent="submit">
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
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    async submit() {
      await this.login(this.form);
      this.$router.replace({ name: 'Home' });
    },
  },
};
</script>