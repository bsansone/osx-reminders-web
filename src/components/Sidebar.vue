<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useListsStore } from "../stores/lists";
import { useTagsStore } from "../stores/tags";

import SidebarSearch from "./SidebarSearch.vue";
import PinnedLists from "./PinnedLists.vue";
import ListsList from "./ListsList.vue";
import TagsList from "./TagsList.vue";
import NewListModal from "./NewListModal.vue";

const listsStore = useListsStore();
const { visibleLists } = storeToRefs(listsStore);

const tagsStore = useTagsStore();
const { tagsList } = storeToRefs(tagsStore);

const isOpen = ref(false);

const openNewListModal = () => {
  setIsOpen(true);
};

const closeNewListModal = () => {
  setIsOpen(false);
};

const setIsOpen = (value: boolean) => {
  isOpen.value = value;
};
</script>

<template>
  <aside
    class="flex h-full max-h-screen min-h-screen w-full min-w-[220px] max-w-[280px] resize-x flex-col bg-gray-800 py-2"
  >
    <div class="px-2">
      <SidebarSearch />

      <PinnedLists />
    </div>

    <div class="overflow-scroll p-2">
      <span class="block py-2 pl-2 text-xs font-bold text-gray-500">
        My Lists
      </span>

      <ListsList :lists="visibleLists" />

      <template v-if="tagsList.length > 1">
        <div class="pt-2"></div>

        <span class="block py-2 pl-2 text-xs font-bold text-gray-500">
          Tags
        </span>

        <TagsList :tags="tagsList" />

        <div class="pb-2"></div>
      </template>
    </div>

    <div class="mt-auto pl-3 pt-1">
      <button
        class="cursor-auto text-sm font-medium text-gray-500 active:text-gray-400"
        @click="openNewListModal"
      >
        <font-awesome-icon icon="fa-regular fa-square-plus" class="mr-1" />
        Add list
      </button>
    </div>
  </aside>

  <NewListModal
    :is-open="isOpen"
    @on-submit="closeNewListModal"
    @on-close="closeNewListModal"
  />
</template>
