<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function handleTryAgain() {
  router.push('/login');
}
</script>

<template>
  <div class="container">
    <h1>Unautherized access to App</h1>
    <p>The selected guild is not licensed to use this software.</p>
    <button @click="handleTryAgain">Try again</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  place-items: center;
}
</style>
