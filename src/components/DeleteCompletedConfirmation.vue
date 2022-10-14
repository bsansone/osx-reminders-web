<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";

import { useRemindersStore, Reminder } from "../stores/reminders";

const remindersStore = useRemindersStore();
const { deleteReminder } = remindersStore;

interface Props {
  isOpen: boolean;
  completedReminders: Reminder[];
}

const props = defineProps<Props>();
const emit = defineEmits(["onSubmit", "onClose"]);

const onClose = () => {
  emit("onClose");
};

const handleSubmit = () => {
  emit("onSubmit");

  props.completedReminders.forEach((reminder) => {
    deleteReminder(reminder.id);
  });
};
</script>

<template>
  <Dialog :open="isOpen" @close="onClose" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel
        class="w-full max-w-[260px] rounded border border-gray-700 bg-gray-800 p-4 text-center text-gray-200"
      >
        <DialogTitle class="text-sm font-bold"
          >Clear completed reminders?</DialogTitle
        >

        <DialogDescription class="pb-4 pt-2 text-xs">
          {{ completedReminders.length }} completed
          {{ completedReminders.length > 1 ? "reminders" : "reminder" }} will be
          deleted from this list. This cannot be undone.
        </DialogDescription>

        <form
          @submit.prevent="handleSubmit"
          class="flex justify-end space-x-4 text-sm"
        >
          <button
            class="w-full cursor-default rounded-md bg-gray-600 py-1 drop-shadow"
            @click="onClose"
          >
            Cancel
          </button>
          <button
            class="w-full cursor-default rounded-md bg-blue-600 py-1 drop-shadow"
            type="submit"
          >
            Delete
          </button>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>
