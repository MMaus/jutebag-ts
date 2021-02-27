import { Module } from "vuex";
import { JuteBagState } from "@/store/types";
import { ShoppingListState } from "./types";

import { state as initialState } from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const module: Module<ShoppingListState, JuteBagState> = {
  getters: getters,
  mutations: mutations,
  actions: actions,
  state: initialState,
  namespaced: true,
};

export default module;