import { Category, ShoppingItem, ShoppingListState, SyncState } from "./types";

export default {
  categories(state: ShoppingListState): Array<Category> {
    return state.categories;
  },

  itemsByCategory(
    state: ShoppingListState
  ): (arg0: string) => Array<ShoppingItem> {
    return (id: string) =>
      state.categories.find((category) => category.id === id)?.items || [];
  },
  syncState(state: ShoppingListState): SyncState {
    return state.syncState;
  },
};
