<!-- 

- Can put any amount of spaces
- Extra spaces get removed when focusout
- On backspace, if next character is not space, highlight tag

 -->
<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
const DEFAULT_INPUT_WIDTH = 25;
const props = defineProps(["tags"]);
const emit = defineEmits(["onAdd"]);
const tag = ref("");
const highlightedTag = ref("");
const inputWidth = ref(DEFAULT_INPUT_WIDTH);
const hiddenTag = ref();

const onInputFocus = () => {
  updateInputWidth();
  removeHighlightTag();
};

const updateInputWidth = () => {
  const width = hiddenTag.value.offsetWidth;

  if (width > DEFAULT_INPUT_WIDTH) {
    inputWidth.value = hiddenTag.value.offsetWidth;
  } else {
    inputWidth.value = DEFAULT_INPUT_WIDTH;
  }
};

const removeHighlightTag = () => {
  highlightedTag.value = "";
};

const highlightTag = (_tag: string) => {
  highlightedTag.value = _tag;
};

const onTagClick = (_tag: string) => {
  highlightTag(_tag);
};

watch(tag, (curr) => {
  if (curr.includes(" ")) {
    emit("onAdd", curr.trim());
    nextTick(() => {
      tag.value = "";
    });
  }

  nextTick(() => {
    updateInputWidth();
  });
});
</script>

<template>
  <div class="flex w-full min-w-0 cursor-text flex-wrap space-x-1">
    <span
      @click="onTagClick(_tag)"
      :class="
        highlightedTag === _tag ? 'bg-blue-500 text-white' : 'text-blue-400'
      "
      :key="_tag"
      v-for="_tag in props.tags"
    >
      #{{ _tag }}
    </span>
    <input
      ref="input"
      type="text"
      v-model="tag"
      class="min-w-0 bg-transparent"
      :style="{
        width: `${inputWidth}px`,
      }"
      @focus="onInputFocus"
      :placeholder="!props.tags || !props.tags.length ? 'Add Tags' : ''"
    />
    <span
      ref="hiddenTag"
      class="min-w-10 absolute -left-[999999px] inline-block"
    >
      {{ tag }}
    </span>
  </div>
</template>
