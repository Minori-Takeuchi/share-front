<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <p v-if="this.$store.state.isAuth === true">{{ user.name }}</p>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { useStore } from "vuex";
import { computed } from 'vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
setup() {
  const store = useStore();
  const user = computed(() => {
      return store.state.user;
  });

  return {
    user
  }
}
}
</script>
