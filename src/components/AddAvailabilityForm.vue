<template>
  <div class="modal-backdrop" v-if="open" @click.self="$emit('close')">
    <div class="modal">
      <h3>Add Availability</h3>

      <form @submit.prevent="submit">
        <label>
          Type
          <select v-model="type" required>
            <option value="premier">Premier</option>
            <option value="scrim">Scrim</option>
            <option value="match">Match</option>
          </select>
        </label>

        <label>
          Date
          <input type="date" v-model="date" required />
        </label>

        <label>
          Start Time
          <input type="time" v-model="startTime" required />
        </label>

        <label>
          End Time
          <input type="time" v-model="endTime" required />
        </label>

        <div class="actions">
          <button type="submit">Save</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
const props = defineProps<{ open: boolean; guildId: string; userId: string }>();
const emit = defineEmits(['close', 'saved']);

const auth = useAuthStore();

const type = ref('premier');
const date = ref('');
const startTime = ref('');
const endTime = ref('');

const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const submit = async () => {
    if (!date.value || !startTime.value || !endTime.value) return;

    const startUtc = new Date(`${date.value}T${startTime.value}:00Z`).toISOString();
    const endUtc = new Date(`${date.value}T${endTime.value}:00Z`).toISOString();

    const body = {
        guildId: props.guildId,
        userId: props.userId,
        type: type.value,
        startUtc,
        endUtc,
        userName: auth.user?.username,
    };

    try {
        const res = await fetch(`${url}/availability`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to add availability');
        emit('saved', data.results);
        emit('close');
    } catch (error) {
        console.error(error);
        alert('Failed to add availability.')
    }
}
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: #242424;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  color: #fff;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  gap: 0.25rem;
}
input, select {
  padding: 0.5rem;
  border: 1px solid #555;
  border-radius: 4px;
  background: #1a1a1a;
  color: #fff;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button[type="submit"] {
  background: #0077ff;
  color: white;
}
button[type="button"] {
  background: #444;
  color: white;
}
</style>
