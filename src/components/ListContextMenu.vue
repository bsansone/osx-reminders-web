<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { List, useListsStore, ListSortBy } from "../stores/lists";
import { onClickOutside } from "@vueuse/core";
import NewListModal from "./NewListModal.vue";
const listsStore = useListsStore();

// const { selectedList } = storeToRefs(listsStore);
const { toggleShowListCompleted, deleteList, setListSortBy } = listsStore;

interface Props {
  list: List;
}

interface Coords {
  x: number;
  y: number;
}

interface MenuGroupItemDropdownOptions {
  label: string;
  value?: string;
}

interface MenuGroupItem {
  label: string;
  value?: string;
  onClick?: Function;
  options?: MenuGroupItemDropdownOptions[]
}

interface MenuGroup {
  items: MenuGroupItem[],
}

const emit = defineEmits(["onClose"]);
const props = defineProps<Props>();

const isOpen = ref(false);
const x = ref(0);
const y = ref(0);

const open = (coords: Coords) => {
  x.value = coords.x;
  y.value = coords.y;
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
  emit("onClose");
};

const isModalOpen = ref(false);

const openNewListModal = () => {
  close();
  setIsModalOpen(true);
};

const closeNewListModal = () => {
  setIsModalOpen(false);
};

const setIsModalOpen = (value: boolean) => {
  isModalOpen.value = value;
};

defineExpose({ open });

const menuGroups = computed<MenuGroup[]>(() => [
  {
    items: [
      {
        label: "Show List Info",
        onClick: () => openNewListModal()
      },
      {
        label: `${props.list.showCompleted ? 'Hide' : 'Show'} Completed`,
        onClick: () => toggleShowListCompleted(props.list.id)
      },
    ]
  },
  {
    items: [
      { label: "Open List in New Window" },
    ]
  },
  {
    items: [
      {
        label: "Sort By",
        value: "sortBy",
        onClick: (sortBy: ListSortBy) => setListSortBy(props.list.id, sortBy),
        options: [
          { value: "manual", label: "Manual" },
          { value: "dueDate", label: "Due Date" },
          { value: "creationDate", label: "Creation Date" },
          { value: "priority", label: "Priority" },
          { value: "title", label: "Title" },
        ]
      },
    ]
  },
  {
    items: [
      { label: "Rename" },
      { label: "Delete", onClick: () => deleteList(props.list.id) },
      { label: "Add to Group" },
    ]
  },
  {
    items: [
      { label: "Share List" },
    ]
  },
]);
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" v-click-outside="close" class="fixed" :style="`left: ${x}px; top: ${y}px`">
      <Menu as="div">
        <MenuItems static class="px-2 w-[250px] rounded-md border border-gray-600 bg-gray-800">
          <div>
            <div v-for="(group, index) in menuGroups">
              <hr v-if="index > 0" class="border-gray-600" />
              <MenuItem as="template" v-slot="{ active }" v-for="item in group.items">
              <Menu v-if="item.options" as="div">
                <MenuButton :class="[
                  active ? 'bg-blue-500' : '',
                  'mb-1 px-2 inline-flex w-full items-center justify-between rounded-sm text-xs font-medium text-white leading-normal relative',
                ]">
                  {{ item.label }}
                  <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </MenuButton>
                <MenuItems :static="active" :style="`left: 242px; top: 80px;`"
                  class="w-[125px] rounded-md border border-gray-600 bg-gray-800 absolute">
                  <div class="mb-1">
                    <MenuItem as="template" v-slot="{ active: subActive }" v-for="option in item.options">
                    <button :class="[
                      subActive ? 'bg-blue-500' : '',
                      'px-1 py-1 inline-flex w-full items-center rounded-sm text-xs font-medium text-white leading-none',
                    ]" @click="() => { item.onClick ? item.onClick(option.value) : null }">
                      <span :class="[
                        'pr-2',
                        item.value && item.value !== undefined && list[item.value] === option.value ? '' : 'invisible'
                      ]">
                        <font-awesome-icon icon="fa-solid fa-check" />
                      </span>
                      {{ option.label }}
                    </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              <button v-else :class="[
                active ? 'bg-blue-500' : '',
                'mb-1 px-2 inline-flex w-full items-center rounded-sm text-xs font-medium text-white leading-normal',
              ]" @click="item.onClick">
                {{ item.label }}
              </button>
              </MenuItem>
            </div>
          </div>
        </MenuItems>
      </Menu>
    </div>

    <NewListModal :list="list" :is-open="isModalOpen" @on-submit="closeNewListModal" @on-close="closeNewListModal" />
  </Teleport>
</template>
