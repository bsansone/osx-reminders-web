import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import orderBy from "lodash.orderby";
import { useTagsStore } from "./tags";
import {
  DEFAULT_LISTS_STATE,
  DEFAULT_LIST_COLOR,
  DEFAULT_LIST_SORT_BY,
  DEFAULT_PINNED_LISTS_ORDER,
} from "../constants/constants";
import { getNextId } from "../utils/utils";

type ListColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "gray";

export type ListSortBy =
  | "manual"
  | "dueDate"
  | "creationDate"
  | "priority"
  | "title";

export interface List {
  id: number;
  name: string;
  color: ListColor;
  icon?: string;
  smartList: boolean;
  selected: boolean;
  pinned: boolean;
  showCompleted: boolean;
  hidden: boolean;
  sortBy: ListSortBy;
}

interface Lists {
  lists: {
    [key: string]: List;
  };
}

export const useListsStore = defineStore("lists", {
  state: () => ({
    lists: useStorage("lists", DEFAULT_LISTS_STATE),
    pinnedListsOrder: DEFAULT_PINNED_LISTS_ORDER,
  }),
  getters: {
    ids(state): string[] {
      return Object.keys(state.lists);
    },
    nextId(): number {
      return getNextId(this.ids);
    },
    listsList(state): List[] {
      return Object.values(state.lists);
    },
    listsListOrdered(): List[] {
      return orderBy(this.listsList, "id");
    },
    selectedList(): List {
      return this.listsList.find((list) => list.selected);
    },
    visibleLists(): List[] {
      return this.listsList.filter((list) => !list.pinned && !list.hidden);
    },
    pinnedLists(): List[] {
      return this.listsList.filter((list) => list.pinned);
    },
  },
  actions: {
    addList(
      name: string,
      smartList: boolean,
      color: ListColor = DEFAULT_LIST_COLOR,
      icon?: string
    ) {
      this.lists[this.nextId] = {
        id: this.nextId,
        name,
        color,
        icon,
        smartList,
        sortBy: DEFAULT_LIST_SORT_BY,
        selected: true,
        pinned: false,
        showCompleted: false,
        hidden: false,
      };
    },
    deleteList(id: number) {
      if (this.lists[id].pinned || this.lists[id].hidden) {
        return;
      }

      const LAST_PINNED_LIST_ID = 4;
      const ALL_LIST_ID = 1;

      let prevId = id;

      while (prevId > LAST_PINNED_LIST_ID) {
        prevId--;

        if (this.lists[prevId]) {
          break;
        }
      }

      if (prevId === LAST_PINNED_LIST_ID) {
        prevId = ALL_LIST_ID;
      }

      if (prevId) {
        this.selectList(prevId);
      }

      delete this.lists[id];
    },
    setListName(id: number, name: string) {
      if (!name?.trim() || this.lists[id].pinned || this.lists[id].hidden) {
        return;
      }

      this.lists[id].name = name;
    },
    setListColor(id: number, color: ListColor) {
      if (this.lists[id].pinned || this.lists[id].hidden) {
        return;
      }

      this.lists[id].color = color;
    },
    setListIcon(id: number, icon: string) {
      if (this.lists[id].pinned || this.lists[id].hidden) {
        return;
      }

      this.lists[id].icon = icon;
    },
    selectList(id: number) {
      let previousSelectedId: number = -1;

      if (this.selectedList) {
        previousSelectedId = this.selectedList.id;
      }

      if (previousSelectedId !== -1) {
        this.lists[previousSelectedId].selected = false;
      }

      this.lists[id].selected = true;

      const tagsStore = useTagsStore();
      const { deselectAllTags } = tagsStore;
      deselectAllTags();
    },
    deselectList(id: number) {
      this.lists[id].selected = false;
    },
    toggleShowListCompleted(id: number) {
      this.lists[id].showCompleted = !this.lists[id].showCompleted;
    },
    setListSortBy(id: number, sortBy: ListSortBy) {
      this.lists[id].sortBy = sortBy;
    },
  },
});
