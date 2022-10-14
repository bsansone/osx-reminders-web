<script setup lang="ts">
import ListsListItem from "./ListsListItem.vue";

defineProps(["lists"]);
</script>

<template>
  <ul>
    <ListsListItem v-for="list in lists" :key="list.id" :list="list" />
  </ul>
</template>
