<script setup lang="ts">
defineProps(["icon", "bgColor"]);
</script>

<template>
  <div
    :class="`icon mr-2 flex items-center justify-center rounded-full ${bgColor}`"
  >
    <div class="text-xs font-bold text-white">
      <font-awesome-icon :icon="icon" />
    </div>
  </div>
</template>

<style>
.icon {
  width: 27px;
  height: 27px;
}
</style>
