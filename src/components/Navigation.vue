<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navigation">
    <ul class="navigation-links">
      <li class="link">
        <RouterLink to="/home" active-class="active">
          <HomeFilled class="icon" />
        </RouterLink>
      </li>
      <li class="link">
        <RouterLink to="/schedule" active-class="active">
          <Calendar class="icon" />
        </RouterLink>
      </li>
      <li class="link">
        <RouterLink to="/profile" active-class="active">
          <UserFilled class="icon" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  background-color: #242424;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style: none;
    padding: 0;
    li {
      text-decoration: none;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: 32px;
          color: white;
        }
        &.active .icon {
          color: #ffd700;
        }
      }
    }
  }
}
</style>
