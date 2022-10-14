<script setup lang="ts">
import RemindersListItem from "./RemindersListItem.vue";
defineProps(["reminders"]);
</script>

<template>
  <ul class="pt-4">
    <RemindersListItem
      v-for="reminder in reminders"
      :key="reminder.id"
      :reminder="reminder"
    />
  </ul>
</template>
