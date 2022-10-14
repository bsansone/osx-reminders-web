<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

interface State {
  height: "auto" | number;
}

const props = defineProps(["value", "editing", "placeholder", "focusOnMount"]);
const state: State = reactive({
  height: "auto",
});
const textarea = ref(null);
const emit = defineEmits(["onBlur", "onFocus"]);

onMounted(() => {
  if (props.editing && props.focusOnMount) {
    // @ts-ignore
    textarea.value.focus();
  }
});

const onBlur = (e: Event) => {
  emit("onBlur", { value: (e.target as HTMLInputElement).value });
};

// watch(props.editing, (curr) => {
//   if (curr) {
//     if (!textarea || !textarea.value) {
//       return;
//     }

//     // @ts-ignore
//     textarea.value.focus();
//   }
// });

const updateValue = (e: Event) => {
  updateTextareaHeight(e.target as HTMLInputElement);
  // emit("update:value", (e.target as HTMLInputElement).value);
};

const onInput = (e: Event) => {
  updateValue(e);
};

const onFocus = (e: Event) => {
  updateTextareaHeight(e.target as HTMLInputElement);
  emit("onFocus", { value: (e.target as HTMLInputElement).value });
};

const updateTextareaHeight = (el: HTMLInputElement) => {
  state.height = el.scrollHeight;
};

const onEnter = (e: Event) => {
  e.preventDefault();
};
</script>

<template>
  <textarea
    ref="textarea"
    :value="value"
    @input="onInput"
    @blur="onBlur"
    @focus="onFocus"
    @keypress.enter="onEnter"
    class="h-6 w-full resize-none bg-transparent p-1 caret-white"
    :style="{
      height: `${state.height}px`,
      overflowY: 'hidden',
    }"
    :placeholder="placeholder"
  />
</template>

<style lang="scss"></style>
