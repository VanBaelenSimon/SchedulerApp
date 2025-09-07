<template>
  <div v-if="auth.user">
    <h1>Welcome, {{ auth.user.username }}</h1>
    <p>Guild: {{ auth.user.guildName }}</p>
  <div v-if="auth.user" class="pages">
    <button @click="auth.logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../store/auth';
const auth = useAuthStore();
</script>
<style scoped lang="scss">

</style>