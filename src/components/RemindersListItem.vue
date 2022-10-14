<script setup lang="ts">
import { computed, ref } from "vue";

import {
  formatReminderDateDisplay,
  isToday,
  isTomorrow,
  inPast,
} from "../utils/utils";

import Checkbox from "./Checkbox.vue";
import TagsInput from "./TagsInput.vue";
import InlineEdit from "./InlineEdit.vue";
import XMarkButton from "./XMarkButton.vue";
import TagMenu from "./TagMenu.vue";

import { useRemindersStore } from "../stores/reminders";
import TimePicker from "./TimePicker.vue";

const props = defineProps(["reminder", "isFirst"]);

const dueDate = ref(props.reminder.dueDate);

const remindersStore = useRemindersStore();
const {
  setReminderText,
  deleteReminder,
  setEditingReminder,
  setFlagReminder,
  setReminderCompleted,
  setHighlightReminder,
  setReminderReady,
  addReminderTag,
  setReminderDueDate,
} = remindersStore;

const onBlur = (data: { value: string }) => {
  const { value } = data;
  if (!value || !value.trim()) {
    deleteReminder(props.reminder.id);
  } else {
    // setEditingReminder(props.reminder.id);
    setReminderText(props.reminder.id, data.value);
  }
};

const onFocus = () => {
  if (!props.reminder.editing) {
    setEditingReminder(props.reminder.id, true);
  }
};

const setDate = (value: Date) => {
  dueDate.value = value;
  setReminderDueDate(props.reminder.id, value);
};

const addTag = (tag: string) => {
  addReminderTag(props.reminder.id, tag);
};

const onClick = (e: Event) => {
  if (!props.reminder.highlighted && !props.reminder.editing) {
    setHighlightReminder(props.reminder.id, true);
  }
};

const onClickOutside = (e: Event) => {
  if (props.reminder.text) {
    setEditingReminder(props.reminder.id, false);

    if (!props.reminder.ready) {
      setReminderReady(props.reminder.id, true);
    }
  }

  if (props.reminder.highlighted) {
    setHighlightReminder(props.reminder.id, false);
  }
};

const toggleFlagReminder = () => {
  setFlagReminder(props.reminder.id, !props.reminder.flagged);
};

const onChecked = () => {
  setReminderCompleted(props.reminder.id, !props.reminder.completed);
};

const dateDisplay = computed(() => {
  if (isToday(props.reminder.dueDate)) {
    return "Today";
  } else if (isTomorrow(props.reminder.dueDate)) {
    return "Tomorrow";
  } else {
    return formatReminderDateDisplay(props.reminder.dueDate);
  }
});

const isDateInPast = computed(() => {
  return inPast(props.reminder.dueDate);
});
</script>

<template>
  <li
    class="group px-4"
    :class="reminder.highlighted ? 'bg-gray-700' : ''"
    v-click-outside="onClickOutside"
    @click="onClick"
  >
    <div class="flex">
      <div class="pr-4">
        <Checkbox @update:checked="onChecked" :checked="reminder.completed" />
      </div>

      <div class="w-full border-b border-gray-700 pb-1 text-sm">
        <div class="flex items-center justify-between">
          <div class="w-full leading-tight text-gray-100">
            <InlineEdit
              :value="reminder.text"
              @on-blur="onBlur"
              @on-focus="onFocus"
              :editing="reminder.editing"
              :focus-on-mount="!reminder.ready"
            />
            <InlineEdit
              v-if="reminder.editing || reminder.notes"
              :value="reminder.notes"
              :editing="reminder.editing"
              placeholder="Notes"
            />
            <!-- <TagsInput
              v-if="reminder.editing || tags"
              @on-add="addTag"
              :tags="tags"
            /> -->
            <p
              v-if="!reminder.editing && reminder.dueDate"
              :class="isDateInPast ? 'text-red-500' : 'text-gray-500'"
            >
              {{ dateDisplay }}
            </p>
            <ul v-if="reminder.editing" class="flex">
              <li>
                <div class="m-1 w-28">
                  <Datepicker
                    :model-value="dueDate"
                    @update:modelValue="setDate"
                    placeholder="Add Date"
                    :enable-time-picker="false"
                    :keep-action-row="false"
                    dark
                    clearable
                    auto-apply
                  >
                    <template #clear-icon="{ clear }">
                      <XMarkButton @click="clear" class="mr-2 text-xs" />
                    </template>
                  </Datepicker>
                </div>
              </li>
              <li v-if="reminder.dueDate">
                <TimePicker :reminder="reminder" />
              </li>
              <li>
                <div
                  class="m-1 rounded-md bg-gray-800 py-1 px-2 text-xs font-semibold text-gray-400"
                >
                  <font-awesome-icon icon="fa-solid fa-location-arrow" />
                  Add Location
                </div>
              </li>
              <li>
                <TagMenu :reminder="reminder" />
              </li>
              <li>
                <div
                  class="m-1 rounded-md bg-gray-800 py-1 px-2 text-xs font-semibold text-gray-400"
                >
                  <button
                    @click="toggleFlagReminder"
                    :class="reminder.flagged ? 'text-orange-400' : ''"
                  >
                    <font-awesome-icon
                      :icon="`${
                        reminder.flagged ? 'fa-solid' : 'fa-regular'
                      } fa-flag`"
                    />
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex space-x-6">
            <div
              class="relative flex hidden h-5 w-5 items-center justify-center rounded-full border border-orange-400 text-xs text-orange-400 group-hover:flex"
            >
              <font-awesome-icon icon="fa-solid fa-info" />
            </div>
            <div
              v-if="reminder.flagged && !reminder.editing"
              class="text-xs text-orange-400"
            >
              <font-awesome-icon icon="fa-solid fa-flag" />
            </div>
          </div>
        </div>

        <div v-if="reminder.notes" class="pb-4">
          <p class="leading-tight text-gray-500">{{ reminder.notes }}</p>
        </div>
      </div>
    </div>
  </li>
</template>
