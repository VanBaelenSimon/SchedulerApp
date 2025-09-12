<template>
  <div class="pages">
    <vue-cal
      style="height: 85dvh"
      active-view="month"
      :events="events"
      disableViews="[week, year, years]"
      click-to-navigate="true"
      dbclick-to-navigate="false"
      events-on-month-view="short"
      timezone="UTC"
      @cell-click="handleDayClick"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import VueCal from 'vue-cal';
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();
const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const events = ref<any[]>([]);
const selectedDayEvents = ref<any[]>([]);
const selectedDateLabel = ref('');

async function fetchTeamAvailabilities() {
  if (!auth.user?.guildId) return;
  const res = await fetch(
    `${url}/teams/${auth.user.guildId}/user/${auth.user.id}/availabilities`
  );
  const data = await res.json();
  if (!data.success) return;

  events.value = data.results.map((a: any) => {
    const startTime = a.startUtc.slice(0, 16).replace('T', ' ');
    const endTime = a.endUtc.slice(0, 16).replace('T', ' ');
    return {
      start: startTime,
      end: endTime,
      title: `${a.userName || a.userId}`,
      class: `team-availability ${a.type.toLowerCase()}`,
    };
  });
}

function handleDayClick({ date, events: dayEvents }: any) {
  selectedDayEvents.value = dayEvents;
  selectedDateLabel.value = new Date(date).toLocaleDateString();
}

onMounted(fetchTeamAvailabilities);
</script>
