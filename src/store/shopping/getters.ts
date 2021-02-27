import { Category, ShoppingItem, ShoppingListState } from "./types";

export default {
  categories(state: ShoppingListState): Array<Category> {
    console.log("GETTING CATEGORIES");
    console.log("STATE IS", state);
    console.log("CATEGORIES ARE:", state.categories);
    return state.categories;
  },

  itemsByCategory(
    state: ShoppingListState
  ): (arg0: string) => Array<ShoppingItem> {
    return (id: string) =>
      state.categories.find((category) => category.id === id)?.items || [];
  },
};
