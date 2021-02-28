import { MutationTree } from "vuex";
import { Category, ShoppingListState, ShoppingItem } from "./types";

function createCategory(state: ShoppingListState, name: string): Category {
  const newCategory: Category = {
    id: "category" + state.nextCategoryId,
    catName: name,
    items: [],
    isDone: true,
  };
  state.nextCategoryId = state.nextCategoryId + 1;
  state.categories.push(newCategory);
  return newCategory;
}

function addItem(
  state: ShoppingListState,
  {
    itemName,
    categoryName,
    quantity,
    inCart,
  }: {
    itemName: string;
    categoryName: string;
    quantity?: number;
    inCart?: boolean;
  }
): void {
  let category = state.categories.find((cat) => cat.catName === categoryName);
  if (category === undefined) {
    category = createCategory(state, categoryName);
  }
  const qty = Number.isFinite(quantity) ? quantity : 1;
  const item = {
    id: "item:" + state.nextItemId,
    itemName,
    quantity: qty,
    inCart: inCart ? true : false,
  } as ShoppingItem;
  state.nextItemId = state.nextItemId + 1;
  category.items.push(item);
  if (!item.inCart) {
    category.isDone = false;
  }
}

export default {
  createCategory,
  addItem,
} as MutationTree<ShoppingListState>;
