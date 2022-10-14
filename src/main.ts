import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faCircleUser,
  faFlag,
  faCalendarDay,
  faCalendarDays,
  faInbox,
  faList,
  faMagnifyingGlass,
  faCircleInfo,
  faInfo,
  faCheck,
  faLocationArrow,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPlusSquare as farPlusSquare,
  faFlag as farFlag,
  faClock,
} from "@fortawesome/free-regular-svg-icons";

import App from "./App.vue";
import "@vuepic/vue-datepicker/dist/main.css";
import "./index.scss";

import Datepicker from "@vuepic/vue-datepicker";

library.add(
  faPlus,
  faFlag,
  faCalendarDay,
  faCalendarDays,
  faInbox,
  faList,
  faMagnifyingGlass,
  farPlusSquare,
  faCircleUser,
  faCircleInfo,
  faInfo,
  farFlag,
  faCheck,
  faLocationArrow,
  faClock,
  faXmark
);

const pinia = createPinia();
const app = createApp(App);

const clickOutside = {
  // @ts-ignore
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (e: Event) => {
      if (!(el == e.target || el.contains(e.target))) {
        if (binding.value) {
          if (binding.value instanceof Function) {
            binding.value(e);
          }
        }
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  // @ts-ignore
  unmounted: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

app.use(pinia);
app.directive("click-outside", clickOutside);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("Datepicker", Datepicker);
app.mount("#body");
