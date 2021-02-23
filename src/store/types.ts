import { ShoppingListState } from "./shopping/types";

export interface RootState {
  version: number;
  shoppingList: ShoppingListState;
}
