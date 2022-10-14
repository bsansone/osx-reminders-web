<script setup lang="ts">
import PinnedListsItem from "./PinnedListsItem.vue";
import { useListsStore } from "../stores/lists";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import orderBy from "lodash.orderby";
import { getBgColor, getTextColor } from "../utils/utils";

const listsStore = useListsStore();
const { pinnedLists, pinnedListsOrder, selectedList } = storeToRefs(listsStore);

const sortedPinnedLists = computed(() => {
  return orderBy(pinnedLists.value, (list) => {
    return pinnedListsOrder.value.indexOf(list.id);
  }).map((list) => ({
    ...list,
    bgColor: getBgColor(list.color),
    textColor: getTextColor(list.color),
  }));
});
</script>

<template>
  <div class="flex flex-wrap">
    <PinnedListsItem
      :key="list.id"
      :list="list"
      :selected="selectedList && selectedList.id === list.id"
      v-for="list in sortedPinnedLists"
    />
  </div>
</template>
