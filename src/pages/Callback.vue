<template>
  <div class="container">
    <h2>Pick a guild</h2>

    <div v-if="loading">Loading...</div>

    <ul v-else>
      <li
        v-for="guild in guilds"
        :key="guild.id"
        :class="{ selected: guild.id === selectedGuild?.id }"
        @click="selectGuild(guild)"
      >
        <img :src="getGuildIcon(guild)" alt="" width="40" height="40" />
        {{ guild.name }}
      </li>
    </ul>

    <button :disabled="!selectedGuild" @click="confirmGuild">Confirm</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { DiscordUser } from '../types/auth';
const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
}

const router = useRouter();
const route = useRoute();

const loading = ref(true);
const user = ref<DiscordUser | null>(null);
const guilds = ref<DiscordGuild[]>([]);
const selectedGuild = ref<DiscordGuild | null>(null);

const selectGuild = (guild: DiscordGuild) => {
  selectedGuild.value = guild;
};

const getGuildIcon = (guild: DiscordGuild) => {
  return guild.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
    : '';
};

const confirmGuild = async () => {
  if (!selectedGuild.value || !user.value) return;

  await fetch(`${url}/auth/discord/finalize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      guildId: selectedGuild.value.id,
      guildName: selectedGuild.value.name,
      user: user.value,
    }),
  });

  router.push('/home');
};

onMounted(async () => {
  const code = route.query.code as string | undefined;
  if (!code) return router.push('/login');

  try {
    const res = await fetch(`${url}/auth/discord/callback?code=${code}`, {
      credentials: 'include',
    });
    const data = await res.json();
    user.value = data.user;
    guilds.value = data.guilds;
  } catch (error) {
    console.error(error);
    router.push('/login');
  } finally {
    loading.value = false;
  }
});
</script>
<style scoped lang="scss">
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  place-items: center;
  ul {
    width: 80%;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: .25rem;
    li {
      padding: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1px solid #ccc;
      margin-bottom: 5px;
      border-radius: 8px;
      &.selected {
        background-color: #42b88322;
        border-color: #42b883;
      }
    }
  }
  button {
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
@media screen and (min-width: 775px) {
.container{
  ul{
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 0.25rem
  }
}
}
@media screen and (min-width: 1025px) {
.container{
  ul{
    display: grid;
    grid-template-columns: auto auto auto;
    row-gap: 0.25rem
  }
}
}
@media screen and (min-width: 1350px) {
.container{
  ul{
    display: grid;
    grid-template-columns: auto auto auto auto;
    row-gap: 0.25rem
  }
}
}
</style>
