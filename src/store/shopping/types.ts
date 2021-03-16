export type SyncState = "SYNC" | "SYNCING" | "NOT_SYNCED" | "SYNC_ERROR";

export interface ShoppingListState {
  categories: Array<Category>;
  version: number;
  nextCategoryId: number;
  nextItemId: number;
  syncState: SyncState;
}

export interface Category {
  id: string;
  catName: string;
  items: Array<ShoppingItem>;
  isDone: boolean;
}

export interface ShoppingItem {
  id:
    | string
    | null
    | undefined /* ONLY null or undefined when adding to the store */;
  itemName: string;
  quantity: number;
  inCart: boolean;
}
