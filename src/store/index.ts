import { createStore, Store } from "vuex";
import shopping from "./shopping/";
import { JuteBagState } from "./types";

// export default new Vuex.Store<JuteBagState>({
//   modules: {
//     shopping,
//   },
//   getters: {},
//   actions: {},
// });

export default createStore({
  modules: {
    shopping,
  },
}) as Store<JuteBagState>;
