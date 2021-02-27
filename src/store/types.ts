import { ShoppingListState } from "./shopping/types";
import { UserState } from "./user/types";

export interface JuteBagState {
  version: number;
  shoppingList: ShoppingListState;
  user: UserState;
}