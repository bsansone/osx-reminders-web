import { defineStore, storeToRefs } from "pinia";
import { useStorage } from "@vueuse/core";
import { useListsStore } from "./lists";
import { DEFAULT_TAGS_STATE, ALL_TAGS } from "../constants/constants";
import { getNextId } from "../utils/utils";

export interface Tag {
  id: number;
  value: string;
  selected: boolean;
  reminders: number[];
}

// interface Tags {
//   tags: {
//     [key: string]: Tag;
//   };
// }

export const useTagsStore = defineStore("tags", {
  state: () => ({
    tags: useStorage("tags", DEFAULT_TAGS_STATE),
  }),
  getters: {
    ids(state): string[] {
      return Object.keys(state.tags);
    },
    nextId(): number {
      return getNextId(this.ids);
    },
    tagsList(state): Tag[] {
      return Object.values(state.tags);
    },
    selectedTags(): Tag[] {
      return this.tagsList.filter((tag) => tag.selected);
    },
    selectedTagsReminders(): number[] {
      if (!this.selectedTags.length) {
        return [];
      }

      if (this.selectedTags[0].id === ALL_TAGS) {
        return [
          ...new Set(this.tagsList.map((tag) => tag.reminders || []).flat()),
        ];
      }

      return [
        ...new Set(this.selectedTags.map((tag) => tag.reminders || []).flat()),
      ];
    },
  },
  actions: {
    addTag(tag: string, reminderId: number) {
      const foundTag = this.tagsList.find((_tag) => _tag.value === tag);

      if (foundTag !== undefined) {
        if (!this.tags[foundTag.id].reminders.includes(reminderId)) {
          this.tags[foundTag.id].reminders.push(reminderId);
        }
      } else {
        this.tags[this.nextId] = {
          id: this.nextId,
          value: tag,
          selected: false,
          reminders: [reminderId],
        };
      }
    },
    deleteTag(tag: string, reminderId: number) {
      const foundTag = this.tagsList.find((_tag) => _tag.value === tag);

      if (foundTag !== undefined) {
        if (foundTag.reminders.length === 1) {
          delete this.tags[foundTag.id];
        } else {
          this.tags[foundTag.id].reminders = this.tags[
            foundTag.id
          ].reminders.filter((reminder) => reminder === reminderId);
        }
      }
    },
    selectTag(tag: string) {
      const foundTag = this.tagsList.find((_tag) => _tag.value === tag);

      if (foundTag !== undefined) {
        // If a list is already selected when selecting a tag, we deselect the list first
        const listsStore = useListsStore();
        const { deselectList } = listsStore;
        const { selectedList } = storeToRefs(listsStore);

        if (selectedList.value) {
          deselectList(selectedList.value.id);
        }

        // If the tag that we selected is the tag "All Tags", we should deselect all the
        // other tags
        if (foundTag.id === ALL_TAGS) {
          this.selectedTags.forEach((_tag) => {
            this.tags[_tag.id].selected = false;
          });
          // If we select a tag that is _not_ "All Tags" but "All Tags" is already selected,
          // then deselect "All Tags"
        } else if (this.tags[ALL_TAGS].selected) {
          this.tags[ALL_TAGS].selected = false;
        }

        this.tags[foundTag.id].selected = true;
      }
    },
    deselectTag(tag: string) {
      // A tag cannot be deselected if it is the last one selected
      // The only way to deslect a tag is to select a list instead
      const foundTag = this.tagsList.find((_tag) => _tag.value === tag);

      if (foundTag !== undefined && this.selectedTags.length > 1) {
        this.tags[foundTag.id].selected = false;
      }
    },
    deselectAllTags() {
      this.selectedTags.forEach((tag) => {
        this.tags[tag.id].selected = false;
      });
    },
  },
});
