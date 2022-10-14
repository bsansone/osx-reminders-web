<script setup lang="ts">
import { ref, computed } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { List } from "../stores/lists";

interface Props {
  list: List;
}

defineProps<Props>();

const isOpen = ref(false);
const x = ref(0);
const y = ref(0);

const open = (_x: number, _y: number) => {
  x.value = _x;
  y.value = _y;
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

defineExpose({ open });

const menuItems = computed(() => [
  { label: "Show List Info" },
  { label: "Show Completed" },
  { label: "Open List in New Window" },
  { label: "Sort By" },
  { label: "Rename" },
  { label: "Delete" },
  { label: "Add to Group" },
  { label: "Share List" },
]);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      v-click-outside="close"
      class="fixed"
      :style="`left: ${x}px; top: ${y}px`"
    >
      <div
        class="m-1 rounded-md bg-gray-800 py-1 px-2 text-xs font-semibold text-gray-400"
      >
        <Menu as="div" class="relative inline-block">
          <MenuButton class="font-medium"></MenuButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute left-0 mt-1 w-[6.3rem] origin-top-left divide-y divide-gray-600 rounded-md border border-gray-600 bg-gray-900 p-1"
            >
              <div class="mt-1 pt-1">
                <MenuItem
                  :key="menuItem.label"
                  v-for="menuItem in menuItems"
                  class="px-1"
                  v-slot="{ active }"
                >
                  <button
                    :class="[
                      active ? 'bg-blue-500' : '',
                      'py-1/2 inline-flex w-full items-center rounded-sm px-1 text-xs font-medium text-white',
                    ]"
                  >
                    {{ menuItem.label }}
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </Teleport>
</template>
