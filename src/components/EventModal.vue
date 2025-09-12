<template>
  <transition name="fade">
    <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
      <transition name="scale">
        <div v-if="visible" class="modal">
          <!-- Close Button -->
          <button class="modal-close" @click="$emit('close')">✕</button>

          <!-- Title -->
          <h2 class="modal-title">
            Events for <span>{{ formattedDate }}</span>
          </h2>

          <!-- Events List -->
          <ul class="modal-events">
            <li
              v-for="(event, idx) in events"
              :key="idx"
              class="modal-event-item"
            >
              <div class="event-user">{{ event.title }}</div>
              <div class="event-time">
                {{ formatTime(event.start) }} → {{ formatTime(event.end) }}
                <span class="event-type">({{ event.content.type }})</span>
              </div>
            </li>
          </ul>

          <!-- Empty State -->
          <div v-if="!events.length" class="modal-empty">No events found.</div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface EventItem {
  title: string;
  start: string;
  end: string;
  content: {type: string};
}

const props = defineProps<{
  visible: boolean;
  events: EventItem[];
  date: string | null;
}>();

defineEmits(["close"]);

const formattedDate = computed(() => {
  if (!props.date) return "";
  return new Date(props.date).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<style lang="scss" scoped>
/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

/* Modal card */
.modal {
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1.5rem;
  width: 90%;
  max-width: 420px;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
}

/* Close button */
.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  color: #aaa;
  font-size: 1.25rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #fff;
  }
}

/* Title */
.modal-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
}

/* Events list */
.modal-events {
  max-height: 300px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 3px;
  }
}

/* Event item */
.modal-event-item {
  background: #242424;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background: #2e2e2e;
  }

  .event-user {
    font-weight: 500;
    margin-bottom: 0.25rem;
    color: #fff;
  }

  .event-time {
    font-size: 0.875rem;
    color: #bbb;

    .event-type {
      color: #888;
      font-style: italic;
    }
  }
}

/* Empty state */
.modal-empty {
  text-align: center;
  color: #777;
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>
