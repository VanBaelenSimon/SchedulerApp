<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navigation">
    <ul class="navigation-links">
      <li class="link">
        <RouterLink to="/" active-class="active">
          <HomeFilled class="icon" style="color: white; fill: aqua" />
        </RouterLink>
      </li>
      <li class="link">
        <RouterLink to="/schedule" active-class="active">
          <Calendar class="icon" style="color: white" />
        </RouterLink>
      </li>
      <li class="link">
        <RouterLink to="/profile" active-class="active">
          <UserFilled class="icon" style="color: white" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  background-color: #141414;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style: none;
    text-decoration: none;
    padding: 0;
    li {
      text-decoration: none;
      // padding: 0.25rem;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: 32px;
        }
      }
    }
  }
}
@media screen and (min-width: 520px) {
  nav {
    ul {
      li {
        a {
          .icon {
            width: 40px;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1025px) {
  nav {
    .icon {
    }
  }
}
@media screen and (min-width: 1350px) {
  nav {
    .icon {
    }
  }
}
</style>
