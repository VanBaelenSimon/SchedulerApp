<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navigation">
    <ul class="navigation-links">
      <li class="link">
        <RouterLink to="/" active-class="active">
          <HomeFilled style="width: 64px; color: white" />
        </RouterLink>
      </li>
      <li class="link">
        <RouterLink to="/schedule" active-class="active">
          <Calendar style="width: 64px; color: white" />
        </RouterLink>
      </li>
      <li class="link">
        <RouterLink to="/profile" active-class="active">
          <UserFilled style="width: 64px; color: white" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  background-color: #424242;
  border-top: 1px solid white;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style: none;
    text-decoration: none;
    padding: 0;
    li {
      text-decoration: none;
    }
  }
}
</style>
