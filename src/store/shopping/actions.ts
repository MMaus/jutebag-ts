import { ActionContext } from "vuex";
import { JuteBagState } from "../types";
import { ShoppingListState } from "./types";

export default {
  async addOrCreateItem(
    context: ActionContext<ShoppingListState, JuteBagState>,
    args: { itemName: string; categoryName: string }
  ): Promise<void> {
    console.log(
      "TODO: ADD ITEM TO STORE, POTENTIALLY: SAVE TO REMOTE?: ",
      args
    );
  },
};
