<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRemindersStore, Reminder } from "../stores/reminders";
import { useListsStore } from "../stores/lists";
import { useTagsStore } from "../stores/tags";
import RemindersList from "./RemindersList.vue";
import { computed } from "vue";
import { getTextColor } from "../utils/utils";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import DeleteCompletedConfirmation from "./DeleteCompletedConfirmation.vue";
import { ALL_TAGS, DEFAULT_TAGS_COLOR } from "../constants/constants";

const remindersStore = useRemindersStore();
const listsStore = useListsStore();
const tagsStore = useTagsStore();

const { remindersList, reminders } = storeToRefs(remindersStore);
const { selectedList } = storeToRefs(listsStore);
const { selectedTags, selectedTagsReminders } = storeToRefs(tagsStore);
const { addReminder } = remindersStore;
const { toggleShowListCompleted } = listsStore;

const toggleShowCompleted = () => {
  toggleShowListCompleted(selectedList.value.id);
};

const _addReminder = () => {
  addReminder(selectedList.value.id, "");
};

const selectedTagReminders = computed(() => {
  const _reminders: Reminder[] = [];

  selectedTagsReminders.value.forEach((reminderId) => {
    _reminders.push(remindersStore.reminders[reminderId]);
  });

  return _reminders;
});

const displayingTags = computed(() => {
  return selectedTags.value.length > 0;
});

const selectedListReminders = computed(() => {
  if (displayingTags.value) {
    return [];
  }

  return remindersList.value.filter((reminder) => {
    return reminder.listId === selectedList.value.id;
  });
});

const combinedRemindersList = computed(() => {
  return [...selectedListReminders.value, ...selectedTagReminders.value];
});

const displayReminders = computed(() => {
  return combinedRemindersList.value.filter((reminder) => {
    // TODO
    // need to fix this for when a tag is selected
    if (selectedList.value.showCompleted) {
      return true;
    }

    return !reminder.completed;
  });
});
const completedReminders = computed(() => {
  return combinedRemindersList.value.filter(
    (reminder) => reminder.ready && reminder.completed
  );
});
const completedRemindersCount = computed(() => completedReminders.value.length);
const unCompletedReminders = computed(() => {
  return displayReminders.value.filter(
    (reminder) => reminder.ready && !reminder.completed
  );
});
const unCompletedRemindersCount = computed(
  () => unCompletedReminders.value.length
);
const remindersCount = computed(() => {
  // TODO
  // need to fix this for when a tag is selected
  if (selectedList.value.showCompleted) {
    return completedRemindersCount.value + unCompletedRemindersCount.value;
  }

  return unCompletedRemindersCount.value;
});

const textColor = computed(() => {
  const color = displayingTags.value
    ? DEFAULT_TAGS_COLOR
    : selectedList.value.color;
  return getTextColor(color);
});

const title = computed(() => {
  if (!displayingTags.value) {
    return selectedList.value.name;
  }

  if (selectedTags.value.length > 1) {
    return `${selectedTags.value.length} Tags`;
  } else if (selectedTags.value.length === 1) {
    const tag = selectedTags.value[0];

    if (tag.id === ALL_TAGS) {
      return "Tags";
    }

    return `#${tag.value}`;
  }
});

const openDeleteCompletedConfirmation = () => {
  setIsOpen(true);
};

const closeDeleteCompletedConfirmation = () => {
  setIsOpen(false);
};

const isOpen = ref(false);

const setIsOpen = (value: boolean) => {
  isOpen.value = value;
};
</script>

<template>
  <main class="w-full py-4" :class="textColor">
    <div class="flex justify-end pb-4 pr-4">
      <button
        aria-label="Add reminder"
        class="text-gray-500"
        @click="_addReminder"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
    </div>

    <header class="flex items-center justify-between px-4 pb-4">
      <h1 class="truncate text-4xl font-bold leading-tight">
        {{ title }}
      </h1>
      <h2 class="text-4xl font-medium">
        {{ remindersCount }}
      </h2>
    </header>

    <div class="flex justify-between px-4 text-sm">
      <div class="space-x-2 text-gray-500">
        <span>{{ completedRemindersCount }} Completed</span>

        <span>&bull;</span>

        <span
          v-if="!completedRemindersCount"
          class="font-medium opacity-50"
          :class="textColor"
        >
          Clear
        </span>
        <div v-else class="inline">
          <Menu as="div" class="relative inline-block">
            <MenuButton class="font-medium" :class="textColor"
              >Clear</MenuButton
            >

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute left-0 mt-1 w-[6.3rem] origin-top-left rounded-md border border-gray-600 bg-gray-900"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="openDeleteCompletedConfirmation"
                      :class="[
                        active ? 'bg-blue-500' : '',
                        'py-1/2 block rounded-sm px-1 text-xs font-medium text-white',
                      ]"
                    >
                      All Completed
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <div>
        <!-- TODO -->
        <!-- need to fix this for when a tag is selected -->
        <button @click="toggleShowCompleted" class="cursor-default font-medium">
          {{ selectedList.showCompleted ? "Hide" : "Show" }}
        </button>
      </div>
    </div>

    <div
      v-if="!displayReminders.length"
      class="flex items-center justify-center"
      @click="_addReminder"
    >
      <span class="text-3xl text-gray-600">No Reminders</span>
    </div>

    <RemindersList v-else :reminders="reminders" />

    <DeleteCompletedConfirmation
      :is-open="isOpen"
      @on-submit="closeDeleteCompletedConfirmation"
      @on-close="closeDeleteCompletedConfirmation"
      :completed-reminders="completedReminders"
    />
  </main>
</template>
