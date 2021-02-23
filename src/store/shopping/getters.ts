import { ShoppingListState } from "./types";

export default {
  categories(state: ShoppingListState) {
    return state.categories;
  },

  itemsByCategory(state: ShoppingListState) {
    return (id: string) =>
      state.categories.find((category) => category.id === id)?.items;
  },
};
