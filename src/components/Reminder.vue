<script setup lang="ts">
import { computed } from "vue";

type Reminder = {
  id: Number;
  listId: Number;
  text: String;
  notes?: String;
  tags?: [];
  date?: String;
  location?: String;
  priority?: String;
  url?: String;
  flagged: Boolean;
  completed: Boolean;
};

const props = defineProps(["reminder"]);

const completedDisplay = computed(() =>
  props.reminder.completed ? "✅" : "🔳"
);
</script>

<template>
  <li class="flex">
    <div>
      <button @click="$emit('toggleCompleted', reminder.id)">
        {{ completedDisplay }}
      </button>
    </div>
    <div>
      <p>{{ reminder.text }}</p>
      <p>{{ reminder.notes }}</p>
      <ul>
        <li :key="tag" v-for="tag in reminder.tags">
          {{ tag }}
        </li>
      </ul>
    </div>
    <div></div>
  </li>
</template>
