import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import orderBy from "lodash.orderby";

import { useTagsStore } from "./tags";
import { getNextId } from "../utils/utils";

type Priority = "Low" | "Medium" | "High";

export interface Reminder {
  id: number;
  listId: number;
  text: string;
  notes?: string;
  tags?: string[];
  dueDate?: Date;
  dueTime?: Date;
  location?: string;
  priority?: Priority;
  url?: string;
  flagged: boolean;
  ready: boolean;
  completed: boolean;
  editing: boolean;
  highlighted: boolean;
}

interface Reminders {
  reminders: {
    [key: string]: Reminder;
  };
}

export const useRemindersStore = defineStore("reminders", {
  state: () => ({
    reminders: useStorage("reminders", {} as Reminders),
  }),
  getters: {
    ids(state): string[] {
      return Object.keys(state.reminders);
    },
    nextId(): number {
      return getNextId(this.ids);
    },
    remindersList(state): Reminder[] {
      return Object.values(state.reminders);
    },
    remindersListOrdered(): Reminder[] {
      return orderBy(this.remindersList, "id");
    },
    hasNotReadyReminders(): boolean {
      return this.remindersList.some((reminder) => !reminder.ready);
    },
  },
  actions: {
    addReminder(listId: number, text: string) {
      if (this.hasNotReadyReminders) {
        return;
      }

      this.reminders[this.nextId] = {
        id: this.nextId,
        listId,
        text,
        ready: false,
        flagged: false,
        completed: false,
        highlighted: false,
        tags: [],
        editing: true,
      };
    },
    deleteReminder(id: number) {
      const tagStore = useTagsStore();
      const { deleteTag } = tagStore;

      this.reminders[id].tags.forEach((tag: string) => {
        deleteTag(tag, id);
      });

      delete this.reminders[id];
    },
    setReminderReady(id: number, value: boolean) {
      this.reminders[id].ready = value;
    },
    setReminderCompleted(id: number, value: boolean) {
      this.reminders[id].completed = value;
    },
    setFlagReminder(id: number, value: boolean) {
      this.reminders[id].flagged = value;
    },
    setEditingReminder(id: number, value: boolean) {
      this.reminders[id].editing = value;
    },
    setHighlightReminder(id: number, value: boolean) {
      this.reminders[id].highlighted = value;
    },
    setReminderText(id: number, text: string) {
      this.reminders[id].text = text;
    },
    setReminderPriority(id: number, priority: Priority) {
      this.reminders[id].priority = priority;
    },
    addReminderTag(id: number, tag: string) {
      this.reminders[id].tags.push(tag);

      const tagStore = useTagsStore();
      const { addTag } = tagStore;
      addTag(tag, id);
    },
    removeReminderTag(id: number, tag: string) {
      this.reminders[id].tags = this.reminders[id].tags.filter(
        (_tag) => _tag !== tag
      );

      const tagStore = useTagsStore();
      const { deleteTag } = tagStore;
      deleteTag(tag, id);
    },
    setReminderDueDate(id: number, date?: Date) {
      this.reminders[id].dueDate = date;
    },
    setReminderDueTime(id: number, time?: Date) {
      this.reminders[id].dueTime = time;
    },
    setReminderNotes(id: number, notes?: string) {
      this.reminders[id].notes = notes;
    },
    setReminderUrl(id: number, url?: string) {
      this.reminders[id].url = url;
    },
  },
});
