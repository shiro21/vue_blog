<template>
  <router-view />
</template>

<script setup>
  import { inject, onMounted, ref } from 'vue'
  import router from '@/js/router'

  // inject('$store').dispatch('userStorage')
  const url = ref()

  onMounted(async() => {
    url.value = router.currentRoute.value
    await inject('$store').dispatch('userStorage', url.value)
  })

</script>

<style lang="scss">
@import "@/assets/styles/reset";
@import "@/assets/styles/layout";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
