import { MutationTree } from "vuex";
import { Category, ShoppingListState, ShoppingItem } from "./types";

export default {
  createCategory(state: ShoppingListState, name: string): void {
    const newCategory: Category = {
      id: name,
      items: [],
      catName: name,
    };
    state.categories.push(newCategory);
  },

  logStuff(state: ShoppingListState, str: string): void {
    console.log("FOOO:", str);
  },

  addItem(
    state: ShoppingListState,
    category?: Category,
    item?: ShoppingItem
  ): void {
    if (category && item) {
      state.categories.find((cat) => cat.id == category?.id)?.items.push(item);
    }
  },
} as MutationTree<ShoppingListState>;
