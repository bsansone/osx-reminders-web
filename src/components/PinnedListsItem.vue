<script setup lang="ts">
import { useListsStore } from "../stores/lists";

const listsStore = useListsStore();
const { selectList } = listsStore;

const props = defineProps(["list", "selected"]);

const onClick = () => {
  selectList(props.list.id);
};
</script>

<template>
  <button @click="onClick" class="w-1/2 cursor-default p-1">
    <div
      class="rounded-md p-2"
      :class="selected ? `${list.bgColor}` : 'bg-gray-700'"
    >
      <div class="flex justify-between pb-1">
        <div
          style="width: 27px; height: 27px"
          class="flex items-center justify-center rounded-full"
          :class="selected ? 'bg-white' : `${list.bgColor}`"
        >
          <span
            class="block font-bold"
            :class="selected ? `${list.textColor}` : 'text-white'"
          >
            <font-awesome-icon :icon="list.icon" />
          </span>
        </div>
        <div>
          <span class="font-bold text-gray-300">0</span>
        </div>
      </div>
      <span class="block text-left text-xs font-bold text-gray-300">
        {{ list.name }}
      </span>
    </div>
  </button>
</template>
