import max from "lodash.max";

export const getBgColor = (color: string) => {
  return {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    gray: "bg-gray-500",
  }[color || "gray"];
};

export const getTextColor = (color: string) => {
  return {
    red: "text-red-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
    green: "text-green-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    gray: "text-gray-500",
  }[color || "gray"];
};

export const getNextId = (ids: any[]) => {
  const numberedIds = ids ? ids.map(Number) : [];

  if (!numberedIds || numberedIds.length === 0) {
    return 0;
  }

  const currentMax = max(numberedIds);

  if (currentMax === undefined) {
    throw new Error("Max value is undefined.");
  }

  return currentMax + 1;
};

export const formatReminderDateDisplay = (date: Date) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const yyyy = date.getFullYear();
  const y = String(yyyy).slice(-2);
  const m = date.getMonth() + 1;
  const d = date.getDate();

  return `${m}/${d}/${y}`;
};

export const isToday = (date: Date) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const today = new Date();

  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};

export const isTomorrow = (date: Date) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  return tomorrow.getDate() === date.getDate();
};

export const inPast = (date: Date) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const today = new Date();
  return date.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);
};
