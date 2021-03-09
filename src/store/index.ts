import { createStore, Store } from "vuex";
import shopping from "./shopping/";
import user from "./user/";
import app from "./app/";
import { JuteBagState } from "./types";

// export default new Vuex.Store<JuteBagState>({
//   modules: {
//     shopping,
//   },
//   getters: {},
//   actions: {},
// });

import VuexPersistence from "vuex-persist";
const vuexLocal = new VuexPersistence<JuteBagState>({
  storage: window.localStorage,
  reducer: (state) => ({ app: state.app }), // remove to store the entire state
});

export default createStore({
  modules: {
    user,
    shopping,
    app,
  },
  plugins: [vuexLocal.plugin],
}) as Store<JuteBagState>;
