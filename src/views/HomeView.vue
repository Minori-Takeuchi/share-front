<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { useStore } from "vuex";

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
setup() {
  const store = useStore();

  const logout = () => {
    store.dispatch('logout');
  }
  return {
    logout
  }
}
}
</script>
