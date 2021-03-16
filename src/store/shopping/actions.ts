import { ActionContext } from "vuex";
import { JuteBagState } from "../types";
import { User } from "../user/types";
import { RemoteShoppingList } from "./remoteTypes";
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
  async updateQuantity(
    context: ActionContext<ShoppingListState, JuteBagState>,
    { itemId, quantity }: { itemId: string; quantity: number }
  ): Promise<void> {
    context.commit("setQuantity", { itemId, quantity });
  },
  async toggleInCart(
    context: ActionContext<ShoppingListState, JuteBagState>,
    { itemId }: { itemId: string }
  ): Promise<void> {
    context.commit("toggleInCart", { itemId });
  },
  async deleteItem(
    context: ActionContext<ShoppingListState, JuteBagState>,
    { itemId }: { itemId: string }
  ): Promise<void> {
    context.commit("deleteItem", { itemId });
  },
  async uploadItems(
    context: ActionContext<ShoppingListState, JuteBagState>
  ): Promise<void> {
    context.commit("setSyncState", { syncState: "SYNCING" });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    context.commit("setSyncState", { syncState: "SYNC" });
  },
  async downloadItems(
    context: ActionContext<ShoppingListState, JuteBagState>
  ): Promise<void> {
    context.commit("setSyncState", { syncState: "SYNCING" });
    if (!context.rootGetters["user/isLoggedIn"]) {
      console.error("User is not logged in");
      context.commit("setSyncState", { syncState: "SYNC_ERROR" });
      return;
    }
    const user: User = context.rootGetters["user/user"];
    const userEmail = user.email;
    let jsonResponse: RemoteShoppingList;
    try {
      jsonResponse = await fetch("/bagpy/" + userEmail).then((res) =>
        res.json()
      );
    } catch (e) {
      console.log("Error on download", e);
      context.commit("setSyncState", { syncState: "SYNC_ERROR" });
      return;
    }
    console.log("Received object:", jsonResponse);
    console.log(
      `There are ${jsonResponse.categories.length} categories with ${jsonResponse.items.length} items`
    );
  },
};
