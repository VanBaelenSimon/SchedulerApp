<template>
  <div class="pages">
    <vue-cal
      style="height: 85dvh"
      active-view="month"
      :events="events"
      :time-from="10*60"
      hide-view-selector="true"
      disableViews="[day, week, year, years]"
      clickToNavigate="false"
      events-on-month-view="short"
      timezone="UTC"
      @cell-click="onCellClick"
    />
    <EventModal
    :visible="modalVisible"
    :events="selectedEvents"
    :date="selectedDate"
    @close="modalVisible = false"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import VueCal from 'vue-cal';
import { useAuthStore } from '../store/auth';
import EventModal from '../components/EventModal.vue';

const auth = useAuthStore();
const url = import.meta.env.VITE_BACKEND_URL;

const events = ref<any[]>([]);
const modalVisible = ref(false);
const selectedEvents = ref<any[]>([]);
const selectedDate = ref<string | null>(null);

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
      content: {type: a.type}
    };
  });
}

function onCellClick(date: Date) {
  selectedDate.value = date.toDateString();

  const clickedDay = new Date(date).toDateString();
  selectedEvents.value = events.value.filter((e) => {
    const eventStart = new Date(e.start).toDateString();
    const eventEnd = new Date(e.end).toDateString();

    return (
      clickedDay === eventStart ||
      clickedDay === eventEnd ||
      (new Date(e.start) < date && new Date(e.end) > date)
    );
  });
  modalVisible.value = true;
}

onMounted(fetchTeamAvailabilities);
</script>
