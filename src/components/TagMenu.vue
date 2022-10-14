<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

import { useRemindersStore } from "../stores/reminders";

const props = defineProps(["reminder"]);

const remindersStore = useRemindersStore();
const { removeReminderTag } = remindersStore;

const stopPropagation = (e: Event) => {
  e.stopPropagation();
};

const removeTag = (tag: string) => {
  removeReminderTag(props.reminder.id, tag);
};
</script>

<template>
  <div
    class="m-1 rounded-md bg-gray-800 py-1 px-2 text-xs font-semibold text-gray-400"
  >
    <Menu as="div" class="relative inline-block" v-slot="{ open }">
      <MenuButton class="font-medium" @click="stopPropagation"> # </MenuButton>
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
          <div class="px-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-blue-500' : '',
                  'py-1/2 inline-flex w-full rounded-sm px-1 text-xs font-medium text-white',
                ]"
              >
                New Tag
              </button>
            </MenuItem>
          </div>
          <div v-if="reminder.tags && reminder.tags.length" class="mt-1 pt-1">
            <MenuItem
              :key="tag"
              v-for="tag in reminder.tags"
              class="px-1"
              v-slot="{ active }"
            >
              <button
                :class="[
                  active ? 'bg-blue-500' : '',
                  'py-1/2 inline-flex w-full items-center rounded-sm px-1 text-xs font-medium text-white',
                ]"
                @click="removeTag(tag)"
              >
                <span class="pr-2">
                  <font-awesome-icon icon="fa-solid fa-check pa-mr-2" />
                </span>
                {{ tag }}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
