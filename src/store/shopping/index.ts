import { Module } from "vuex";
import { JuteBagState } from "@/store/types";
import { ShoppingListState } from "./types";

import { state as initialState } from "./state";
import getters from "./getters";
import mutations from "./mutations";

const module: Module<ShoppingListState, JuteBagState> = {
  getters: getters,
  mutations: mutations,
  actions: {},
  state: initialState,
  namespaced: true,
};

export default module;
