<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { reactive, computed } from "vue";

import Content from "./components/Content.vue";
import Sidebar from "./components/Sidebar.vue";

const state = reactive({
  selected: {},
  lists: {
    0: {
      id: 0,
      name: "",
      color: "",
      icon: "",
      smartList: false,
      reserved: true,
    },
  },
  reminders: {
    0: {
      id: 0,
      listId: 0,
      text: "Nyx tick medicine",
      notes: "",
      tags: [],
      date: "",
      location: "",
      priority: "",
      url: "",
      flagged: false,
      completed: false,
    },
  },
  tags: [],
});
</script>

<template>
  <Sidebar />
  <Content />
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
</style>
