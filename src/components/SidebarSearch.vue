<template>
  <div class="p-2">
    <label for="search" class="relative block">
      <span
        class="pointer-events-none absolute left-2 top-2 h-3 w-3 -translate-y-1/2 transform text-gray-500"
      >
        <font-awesome-icon
          icon="fa-solid fa-magnifying-glass"
          class="h-3 w-3"
        />
      </span>
      <input
        id="search"
        name="search"
        placeholder="Search"
        class="w-full rounded-lg bg-gray-900 py-2 pr-1 pl-6 text-xs font-bold text-gray-200"
      />
    </label>
  </div>
</template>
