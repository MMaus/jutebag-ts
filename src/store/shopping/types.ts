export interface ShoppingListState {
  categories: Array<Category>;
  version: number;
  nextCategoryId: number;
}

export interface Category {
  id: string;
  catName: string;
  items: Array<ShoppingItem>;
}

export interface ShoppingItem {
  id: string;
  itemName: string;
  quantity: number;
  inCart: boolean;
}
