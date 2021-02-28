import { ActionContext } from "vuex";
import { JuteBagState } from "../types";
import { ShoppingListState } from "./types";

export default {
  /**
   * Adds (creates) the item and a corresponding category if it does not exist.
   * If the item is added,
   *
   * @param context
   * @param args description of the category, of type {itemName, categoryName}
   */
  async addItem(
    context: ActionContext<ShoppingListState, JuteBagState>,
    { itemName, categoryName }: { itemName: string; categoryName: string }
  ): Promise<void> {
    context.commit("addItem", { itemName, categoryName });
  },
};
