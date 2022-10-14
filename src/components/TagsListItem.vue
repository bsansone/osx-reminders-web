<script setup lang="ts">
import { computed } from "vue";
import { useTagsStore, Tag } from "../stores/tags";

const tagsStore = useTagsStore();

const { selectTag, deselectTag } = tagsStore;

interface Props {
  tag: Tag;
}

const props = defineProps<Props>();

const computedTag = computed(() =>
  props.tag.value === "All Tags" ? props.tag.value : `#${props.tag.value}`
);
const computedClass = computed(
  () =>
    `font-bold rounded-md m-1 py-1 px-2 text-xs ${
      props.tag.selected
        ? "bg-blue-500 text-white"
        : "bg-gray-700 text-gray-300"
    }`
);

const onClick = () => {
  if (props.tag.selected) {
    deselectTag(props.tag.value);
  } else {
    selectTag(props.tag.value);
  }
};
</script>

<template>
  <li :class="computedClass">
    <button @click="onClick">
      {{ computedTag }}
    </button>
  </li>
</template>
