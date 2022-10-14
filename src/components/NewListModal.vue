<script setup lang="ts">
import { nextTick, ref } from "vue";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import { useListsStore } from "../stores/lists";
import {
  LIST_COLOR_OPTIONS_MAP,
  DEFAULT_NEW_LIST_FORM,
} from "../constants/constants";

const listsStore = useListsStore();
const { addList } = listsStore;

interface Props {
  isOpen: boolean;
}

defineProps<Props>();

const emit = defineEmits(["onSubmit", "onClose"]);

const name = ref(DEFAULT_NEW_LIST_FORM.name);
const smartList = ref(DEFAULT_NEW_LIST_FORM.smartList);
const color = ref(DEFAULT_NEW_LIST_FORM.color);
const icon = ref(DEFAULT_NEW_LIST_FORM.icon);

const resetForm = () => {
  name.value = DEFAULT_NEW_LIST_FORM.name;
  smartList.value = DEFAULT_NEW_LIST_FORM.smartList;
  color.value = DEFAULT_NEW_LIST_FORM.color;
  icon.value = DEFAULT_NEW_LIST_FORM.icon;
};

const handleSubmit = () => {
  if (!name.value?.trim()) {
    return;
  }

  addList(name.value, smartList.value, color.value, icon.value);

  emit("onSubmit", {
    name: name.value,
    smartList: smartList.value,
    color: color.value,
    icon: icon.value,
  });

  nextTick(() => {
    resetForm();
  });
};

const onClose = () => {
  emit("onClose");
};
</script>

<template>
  <Dialog :open="isOpen" @close="onClose" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel
        class="w-full max-w-lg rounded border border-gray-700 bg-gray-800 p-4 text-gray-300"
      >
        <DialogTitle class="text-sm font-bold">New List</DialogTitle>

        <form @submit.prevent="handleSubmit" class="pt-4">
          <div class="flex items-center">
            <label for="listName" class="pr-4 text-xs font-semibold">
              Name:
            </label>
            <input
              class="w-full rounded-lg bg-gray-900 px-2 py-1 text-xs font-semibold text-gray-200"
              id="listName"
              type="text"
              v-model="name"
              :required="true"
            />
          </div>
          <div class="flex divide-x divide-gray-700 py-4">
            <div class="flex w-6/12 items-center">
              <span class="pr-4 text-xs font-semibold">Color:</span>
              <div class="flex items-center space-x-3">
                <label
                  v-for="(value, key) in LIST_COLOR_OPTIONS_MAP"
                  :key="key"
                  :class="`${value} relative flex h-4 w-4 items-center justify-center rounded-full`"
                  :for="key"
                >
                  <span
                    v-if="color === key"
                    class="h-1/2 w-1/2 rounded-full bg-white"
                  ></span>
                  <input
                    type="radio"
                    name="color"
                    :id="key"
                    :value="key"
                    class="hidden"
                    v-model="color"
                  />
                </label>
              </div>
            </div>
            <div class="flex w-6/12 pl-6">
              <label for="listIcon" class="text-xs font-semibold">Icon:</label>
            </div>
          </div>
          <hr class="mb-4 border-gray-700" />
        </form>

        <div class="flex justify-end space-x-4 text-xs">
          <button
            class="w-[65px] cursor-default rounded-md bg-gray-600 py-1 drop-shadow"
            @click="onClose"
          >
            Cancel
          </button>
          <button
            class="w-[65px] cursor-default rounded-md bg-gray-600 py-1 drop-shadow"
            :class="!name?.trim() ? 'opacity-50' : ''"
            :disabled="!name?.trim()"
            type="submit"
          >
            OK
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
