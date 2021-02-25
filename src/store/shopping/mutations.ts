import { MutationTree } from "vuex";
import { Category, ShoppingListState, ShoppingItem } from "./types";

export default {
  createCategory(state: ShoppingListState, name: string): void {
    const newCategory: Category = {
      id: "category" + state.nextCategoryId,
      catName: name,
      items: [],
      isDone: true,
    };
    state.nextCategoryId = state.nextCategoryId + 1;
    state.categories.push(newCategory);
  },

  logStuff(state: ShoppingListState, str: string): void {
    console.log("FOOO:", str);
  },

  addByCategoryName(
    state: ShoppingListState,
    { category, item }: { category: string; item: ShoppingItem }
  ): void {
    state.categories.find((cat) => cat.catName == category)?.items.push(item);
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
