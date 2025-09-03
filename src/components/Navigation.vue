<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navigation">
    <ul class="navigation-links">
      <li class="link">
        <RouterLink to="/">
          <!-- icon -->
           <span>Home</span>
        </RouterLink>
      </li>
      <li class="link">
        <RouterLink to="/schedule">
          <!-- icon -->
           <span>Schedule</span>
        </RouterLink>
      </li>
      <li class="link">
        <RouterLink to="/profile">
          <!-- icon -->
           <span>Profile</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav{
    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        list-style: none;
        width: 100%;
        height: 100%;
    }
    li {
        text-decoration: none;
        flex-grow: 1;
    }
    width: 100%;
    height: 4rem;
    background-color: blue;
}
</style>
