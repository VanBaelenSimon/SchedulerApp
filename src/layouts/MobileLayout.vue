<template>
  <div>
    <main>
      <router-view />
    </main>
    <Navigation/>
  </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation.vue';
</script>

<style>
</style>
