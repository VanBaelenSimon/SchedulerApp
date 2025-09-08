<template>
  <div class="pages">
    <h1>Profile page</h1>
    <p>User profile info goes here.</p>
    <button @click="auth.logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '../store/auth';
  const auth = useAuthStore();
</script>

<style scoped></style>
