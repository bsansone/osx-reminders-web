<script setup lang="ts">
// import { toRefs, watch, nextTick, onBeforeUnmount, reactive } from "vue";
// import { createPopper } from "@popperjs/core/lib/popper-lite.js";
// import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow.js";
// import flip from "@popperjs/core/lib/modifiers/flip.js";
// import offset from "@popperjs/core/lib/modifiers/offset";
// import arrow from "@popperjs/core/lib/modifiers/arrow";

// const emit = defineEmits(["close:popper", "open:popper"]);

// const toInt = (x: any) => parseInt(x, 10);

// const state = reactive({
//   isOpen: false,
//   popper: null,
// });

// // Enable or disable event listeners to optimize performance.
// const setPopperEventListeners = (enabled: boolean) => {
//   state.popper?.setOptions((options) => ({
//     ...options,
//     modifiers: [...options.modifiers, { name: "eventListeners", enabled }],
//   }));
// };

// const enablePopperEventListeners = () => setPopperEventListeners(true);
// const disablePopperEventListeners = () => setPopperEventListeners(false);

// const close = () => {
//   if (!state.isOpen) {
//     return;
//   }

//   state.isOpen = false;
//   emit("close:popper");
// };

// const open = () => {
//   if (state.isOpen) {
//     return;
//   }

//   state.isOpen = true;
//   emit("open:popper");
// };

// // When isOpen or placement change
// watch([() => state.isOpen], async ([isOpen]) => {
//   if (isOpen) {
//     await initializePopper();
//     enablePopperEventListeners();
//   } else {
//     disablePopperEventListeners();
//   }
// });

// const initializePopper = async () => {
//   await nextTick();
//   state.popper = createPopper(triggerNode.value, popperNode.value, {
//     placement: "bottom-right",
//     modifiers: [
//       preventOverflow,
//     ],
//   });

//   // Update its position
//   state.popper.update();
// };

// onBeforeUnmount(() => {
//   state.popper?.destroy();
// });
const test = (e: Event) => {
  const xCoordinate = e.pageX;
  const yCoordinate = e.pageY;
  console.log(`x: ${xCoordinate}, y: ${yCoordinate}`);
};
</script>

<template>
  <div @contextmenu.prevent="test"></div>
</template>
