<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import XMarkButton from "./XMarkButton.vue";

const props = defineProps(["reminder"]);

const dueTime = ref(props.reminder.dueTime);
const isEditing = ref(false);
const query = ref("");

const clearTime = () => {};

const suggestedTimes = [
  { label: "9:00 AM", value: "9:00 AM", description: "Morning" },
  { label: "12:00 PM", value: "12:00 PM", description: "Noon" },
  { label: "3:00 PM", value: "3:00 PM", description: "Afternoon" },
  { label: "6:00 PM", value: "6:00 PM", description: "Evening" },
  { label: "9:00 PM", value: "9:00 PM", description: "Night" },
];

const getSuggestedTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const [nineAm, noon, threePm, sixPm, ninePm] = suggestedTimes;

  if (hours < 9) {
    return nineAm;
  } else if (hours < 12) {
    return noon;
  } else if (hours < 15) {
    return threePm;
  } else if (hours < 18) {
    return sixPm;
  } else if (hours < 21) {
    return ninePm;
  } else {
    throw new Error("TODO: How do we handle this?");
  }
};
</script>

<template>
  <div
    class="m-1 flex items-center space-x-1 rounded-md bg-gray-800 py-1 px-2 text-xs font-semibold text-gray-400"
  >
    <font-awesome-icon icon="fa-regular fa-clock" />

    <!-- <div class="fixed top-16 w-72">
  <Combobox v-model="dueTime">
    <ComboboxInput
      @change="query = $event.target.value"
      :display-value="(time) => time.label"
      placeholder="Add Time" class="bg-gray-800 w-14"
    />
    <ComboboxOptions>
      <ComboboxOption
        v-for="time in suggestedTimes"
        :key="time.value"
        :value="time.value"
      >
        {{ time.label }}
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
  </div> -->
    <input placeholder="Add Time" class="w-14 bg-gray-800" />
    <XMarkButton @click="clearTime" />
  </div>
</template>
