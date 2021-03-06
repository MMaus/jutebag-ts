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

function toggleInCart(
  state: ShoppingListState,
  { itemId, categoryId }: { itemId: string; categoryId: string }
): void {
  const isInCart = state.categories
    .find((cat) => cat.id === categoryId)
    ?.items.find((it) => it.id === itemId)?.inCart;
  if (isInCart === undefined) {
    return;
  } else {
    state.categories
      .find((cat) => cat.id === categoryId)!
      .items.find((it) => it.id === itemId)!.inCart = !isInCart;
  }
}

function setQuantity(
  state: ShoppingListState,
  { itemId, quantity }: { itemId: string; quantity: number }
) {
  // TODO: this seems so awkward and inefficient. How to improve (ideally without loops)?
  // The problems are that we do the search over the items twice, and continue searching after
  // we found the item. Maybe this indicates an inefficient representation of the data.
  const catIdx = state.categories.findIndex(
    (cat) => cat.items.findIndex((it) => it.id === itemId) > -1
  );
  if (catIdx < 0) {
    throw new Error(`Item with ID ${itemId} was not in any category`);
  }
  const itemIdx = state.categories[catIdx].items.findIndex(
    (it) => it.id === itemId
  );
  state.categories[catIdx].items[itemIdx].quantity = quantity;
}

export default {
  createCategory,
  addItem,
  setQuantity,
  toggleInCart,
} as MutationTree<ShoppingListState>;
