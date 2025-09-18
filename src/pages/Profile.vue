<template>
  <div class="pages">
    <button @click="auth.logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../store/auth';
const auth = useAuthStore();
</script>

<style scoped></style>
