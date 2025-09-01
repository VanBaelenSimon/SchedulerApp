<template>
  <div class="login-page">
    <h1>Login</h1>
    <button @click="login">Login with Discord</button>
  </div>
</template>

<script setup lang="ts">
function login(): void {
  window.location.href = 'http://localhost:3000/auth/discord'
}
</script>
