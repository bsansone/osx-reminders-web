export const DEFAULT_LISTS_STATE = {
  "0": {
    id: 0,
    name: "Results",
    color: "",
    icon: "",
    smartList: false,
    selected: false,
    pinned: false,
    hidden: true,
  },
  "1": {
    id: 1,
    name: "All",
    color: "gray",
    icon: "fa-solid fa-inbox",
    smartList: false,
    selected: false,
    pinned: true,
    hidden: false,
  },
  "2": {
    id: 2,
    name: "Today",
    color: "blue",
    icon: "fa-solid fa-calendar-day",
    smartList: false,
    selected: false,
    pinned: true,
    hidden: false,
  },
  "3": {
    id: 3,
    name: "Scheduled",
    color: "red",
    icon: "fa-solid fa-calendar-days",
    smartList: false,
    selected: false,
    pinned: true,
    hidden: false,
  },
  "4": {
    id: 4,
    name: "Flagged",
    color: "orange",
    icon: "fa-solid fa-flag",
    smartList: false,
    selected: false,
    pinned: true,
    hidden: false,
  },
  "5": {
    id: 5,
    name: "Reminders",
    color: "orange",
    icon: "",
    smartList: false,
    selected: true,
    pinned: false,
    hidden: false,
  },
};

export const DEFAULT_PINNED_LISTS_ORDER = [1, 2, 3, 0];

export const DEFAULT_LIST_COLOR = "blue";

export const DEFAULT_TAGS_STATE = {
  "0": {
    id: 0,
    value: "All Tags",
    selected: false,
  },
};

export const LIST_COLOR_OPTIONS_MAP = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  gray: "bg-gray-500",
};

export const DEFAULT_NEW_LIST_FORM = {
  name: "",
  smartList: false,
  color: "orange",
  icon: "",
};

export const ALL_TAGS = 0;

export const DEFAULT_TAGS_COLOR = "blue";
