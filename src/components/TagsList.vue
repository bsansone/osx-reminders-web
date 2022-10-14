<script setup lang="ts">
import TagListItem from "./TagsListItem.vue";
import { Tag } from "../stores/tags";

interface Props {
  tags: Tag[];
}

defineProps<Props>();
</script>

<template>
  <ul class="mx-1 flex flex-wrap">
    <TagListItem v-for="tag in tags" :key="tag.id" :tag="tag" />
  </ul>
</template>
