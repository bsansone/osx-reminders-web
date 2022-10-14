<script setup lang="ts">
import { ref } from "vue";
import Icon from "./Icon.vue";

import { useListsStore } from "../stores/lists";
import { computed } from "vue";
import { getBgColor } from "../utils/utils";
import ListContextMenu from "./ListContextMenu.vue";

const props = defineProps(["list", "selected"]);

const listsStore = useListsStore();
const { selectList } = listsStore;

const onClick = () => {
  selectList(props.list.id);
};

const bgColor = computed(() => getBgColor(props.list.color));

const menu = ref();

const openMenu = (e: MouseEvent) => {
  menu.value.open(e.pageX, e.pageY);
};
</script>

<template>
  <li class="group relative" @contextmenu.prevent="openMenu">
    <button
      @click="onClick"
      :class="`flex w-full cursor-default items-center justify-between rounded-md py-1 px-2 ${
        list.selected ? 'bg-blue-600' : ''
      } mb-1`"
    >
      <div class="flex items-center justify-between">
        <Icon icon="fa-solid fa-list" :bg-color="bgColor" />

        <span
          class="truncate text-xs font-bold text-gray-100"
          :title="list.name"
        >
          {{ list.name }}
        </span>
      </div>

      <div class="flex items-center">
        <span
          :class="`${
            list.selected ? 'text-gray-100' : 'text-gray-400'
          } mr-2 hidden group-hover:inline`"
        >
          <font-awesome-icon icon="fa-solid fa-circle-user" />
        </span>
        <span class="block text-xs font-medium text-gray-400">{{
          list.count
        }}</span>
      </div>
    </button>

    <ListContextMenu ref="menu" :list="list" />
  </li>
</template>
