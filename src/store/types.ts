import { ShoppingListState } from "./shopping/types";

export interface JuteBagState {
  version: number;
  shoppingList: ShoppingListState;
}
