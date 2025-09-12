<template>
  <div v-if="auth.user" class="pages">
    <section class="availability">
      <div class="availability-header">
        <h2>{{ auth.user.username }}'s availabilities:</h2>
        <button @click="showAddForm = true">Add</button>
      </div>

      <div v-if="selectedItems.length > 0" class="bulk-action">
        <button @click="removeSelected">
          Delete ({{ selectedItems.length }})
        </button>
        <button @click="clearSelection">Cancel</button>
      </div>

      <ul class="availability-list">
        <li
          v-for="item in availability"
          :key="item.shortId"
          :class="{ selected: selectedItems.includes(item.shortId) }"
          @click="handleItemClick(item)"
        >
          <div class="item-content">
            <input
              type="checkbox"
              :checked="selectedItems.includes(item.shortId)"
              @click.stop="toggleSelection(item.shortId)"
            />
            <div class="item-text">
              <div>
                <strong>{{ formatDate(item.startUtc) }}</strong>
                <div class="text-time">
                  <small>{{ formatTime(item.startUtc) }}</small>
                  →
                  <small>{{ formatTime(item.endUtc) }}</small>
                </div>
              </div>
              <span class="type">({{ item.type }})</span>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <AddAvailabilityForm
      v-if="showAddForm && auth.user?.guildId && auth.user?.id"
      :open="showAddForm"
      :guild-id="auth.user.guildId"
      :user-id="auth.user.id"
      @close="showAddForm = false"
      @saved="fetchAvailability"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '../store/auth';
import type { Availability } from '../types/auth';
import AddAvailabilityForm from '../components/AddAvailabilityForm.vue';
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const availability = ref<Availability[]>([]);
const selectedItems = ref<string[]>([]);
const showAddForm = ref(false);

const fetchAvailability = async () => {
  const guildId = auth.user?.guildId;
  const userId = auth.user?.id;

  const listUrl = `${url}/availability/${guildId}/${userId}`;
  const res = await fetch(listUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();

  if (!data.success) throw new Error(data.error || 'Failed to fetch');

  let availabilities = data.results || [];

  availabilities = availabilities.sort((a: any, b: any) =>
    a.startUtc.localeCompare(b.startUtc)
  );

  availability.value = availabilities.map((a: any) => ({
    id: a.id || String(a.shortId),
    ...a,
  }));
};

let interval: number | null = null;

onMounted(() => {
  fetchAvailability();
  interval = window.setInterval(fetchAvailability, 10000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

const handleItemClick = (item: Availability) => {
  if (selectedItems.value.length > 0) {
    toggleSelection(item.shortId);
  } else {
    window.location.href = `/availability/${item.shortId}`;
  }
};

const toggleSelection = (shortId: string) => {
  if (selectedItems.value.includes(shortId)) {
    selectedItems.value = selectedItems.value.filter((i) => i !== shortId);
  } else {
    selectedItems.value.push(shortId);
  }
};

const clearSelection = () => {
  selectedItems.value = [];
};

const removeSelected = async () => {
  if (!auth.user?.guildId || !auth.user?.id) return;

  const items = [
    {
      userId: auth.user.id,
      shortIds: Array.from(selectedItems.value),
    },
  ];

  try {
    const res = await fetch(`${url}/availability/batchdelete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guildId: auth.user.guildId,
        items,
      }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to delete');

    clearSelection();
    await fetchAvailability();
  } catch (error) {
    console.error(error);
    alert('Failed to delete selected availabilities.');
  }
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
  });
};
const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const auth = useAuthStore();
</script>
<style scoped lang="scss">
.header {
  margin-bottom: 1.5rem;
}

.availability {
  .availability-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .bulk-action {
    margin-bottom: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  .availability-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.75rem 1rem;
      margin-bottom: 0.5rem;
      border: 1px solid #3a3a3a;
      border-radius: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #eee;
      transition: background 0.2s, border-color 0.2s;

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: #555;
      }

      &.selected {
        border-color: #0077ff;
        background: rgba(0, 119, 255, 0.15);
      }

      .item-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
      }

      input[type='checkbox'] {
        appearance: none;
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid #555;
        border-radius: 4px;
        background-color: transparent;
        display: grid;
        place-content: center;
        cursor: pointer;
        transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;

        &:hover {
          border-color: #888;
        }

        &:checked {
          background-color: #0077ff;
          border-color: #0077ff;
          box-shadow: 0 0 4px rgba(0, 119, 255, 0.6);
        }

        &:checked::after {
          content: '✔';
          font-size: 12px;
          color: #fff;
          font-weight: bold;
          transform: scale(1);
        }
      }

      .item-text {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 0.25rem;

        strong {
          font-weight: 600;
          color: #fff;
        }
        .text-time {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
        }

        .type {
          font-size: 0.85rem;
          color: #aaa;
        }
      }
    }
  }
}
</style>
