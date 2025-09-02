<template>
  <div>
    <main>
      <router-view />
    </main>

    <nav>
      <ul>
        <li>
          <RouterLink to="/">
            <!-- icon -->
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/schedule">
            <!-- icon -->
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/profile">
            <!-- icon -->
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style>
</style>
