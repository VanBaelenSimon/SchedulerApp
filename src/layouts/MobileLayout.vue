<template>
  <div class="container">
    <router-view />
    <Navigation />
  </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation.vue';
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
