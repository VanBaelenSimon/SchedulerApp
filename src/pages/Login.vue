<template>
  <div class="login-page">
    <h1>Login</h1>
    <button @click="login">Login with Discord</button>
  </div>
</template>

<script setup lang="ts">
const url = import.meta.env.BACKEND_URL || 'http://localhost:3000';
function login(): void {
  window.location.href = `${url}/auth/discord`
}
</script>
