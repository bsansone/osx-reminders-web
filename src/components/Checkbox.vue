<script setup lang="ts">
defineProps(["color", "checkboxId", "checked"]);
const emit = defineEmits(["update:checked"]);

const onInput = (e: Event) => {
  emit("update:checked", (e.target as HTMLInputElement).checked);
};
</script>

<template>
  <div class="custom-checkbox relative inline-block leading-none">
    <input
      :id="checkboxId"
      type="checkbox"
      @input="onInput"
      :checked="checked"
    />
    <label
      :for="checkboxId"
      class="label inline-block before:border"
      :class="
        checked
          ? 'before:border-orange-400 after:bg-orange-400'
          : 'before:border-gray-500'
      "
    >
    </label>
  </div>
</template>

<style lang="scss">
.custom-checkbox {
  input {
    position: absolute;
    left: 0;
    top: 0;
    min-width: 1em;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;

    &:checked + .label {
      &:after {
        visibility: visible;
      }
    }
  }

  .label {
    min-width: calc(1em + 2px);

    &:after,
    &:before {
      content: "";
      width: calc(1em + 2px);
      height: calc(1em + 2px);
      display: block;
      border-radius: 100%;
      z-index: 0;
      position: absolute;
      left: 0;
      top: calc((0% - (100% - 1em)) - 8%);
    }

    &:after {
      transform: scale(0.6);
      visibility: hidden;
    }
  }
}
</style>
