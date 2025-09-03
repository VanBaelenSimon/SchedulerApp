<template>
  <div class="container">
    <main>
      <router-view />
    </main>
    <Navigation/>
  </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation.vue';
</script>

<style scoped lang="scss">
  .container{
    height: 100%;
    main {
      height: 100%;
    }
    display: flex;
    flex-direction: column;
  }
</style>
