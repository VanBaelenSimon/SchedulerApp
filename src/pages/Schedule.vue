<template>
  <div class="pages">
    <vue-cal
      style="height: 80vh"
      :disable-views="['day','week', 'years', 'year']"
      :events="events"
      events-on-month-view="short"
      :time="false"
      @cell-click="handleDayClick"
    />
    <div v-if="selectedDayEvents.length" class="day-details">
      <h3>{{ selectedDateLabel }}</h3>
      <ul>
        <li v-for="e in selectedDayEvents" :key="e.id">
          <strong>{{ e.title }}</strong>
          <span>({{ formatTime(e.start) }} - {{ formatTime(e.end) }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import VueCal from 'vue-cal';
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();
const url = import.meta.env.VITE_BACKEND_URL;

const events = ref<any[]>([]);
const selectedDayEvents = ref<any[]>([]);
const selectedDateLabel = ref('');

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

async function fetchTeamAvailabilities() {
  if (!auth.user?.guildId) return;
  const res = await fetch(
    `${url}/teams/${auth.user.guildId}/user/${auth.user.id}/availabilities`
  );
  const data = await res.json();
  if (!data.success) return;

  events.value = data.results.map((a: any) => ({
    start: new Date(a.startUtc),
    end: new Date(a.endUtc),
    title: `${a.userId} (${a.type})`,
    class: `team-availability ${a.type.toLowerCase()}`,
  }));
}

function handleDayClick({ date, events: dayEvents }: any) {
  selectedDayEvents.value = dayEvents;
  selectedDateLabel.value = new Date(date).toLocaleDateString();
}

onMounted(fetchTeamAvailabilities);
</script>

<style scoped lang="scss">

</style>
