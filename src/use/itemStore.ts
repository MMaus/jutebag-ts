
import { ref, Ref } from 'vue';

/**
 * The Category groups shopping cart items
 */
interface Category {
    id: number;
    name: string;
    items: Array<Item>;
    isDone: boolean;
}


/**
 * An item in a shopping cart
 */
interface Item {
    id: number;
    name: string;
    category: string;
    qty: number;
    stored: boolean;
}

/**
 * The variant of an item which can be stored on the server.
 */
interface StorableItem {
    id: number;
    name: string;
    qty: number;
    categoryId: number;
    stored: boolean;
}


/**
 * The Item repository
 */
class ItemRepository {

    nextItemId = 1;
    nextCategoryId = 1;
    private itemData: Array<Item> = [];
    private categoryData: Array<Category> = [];

    categoriesRef: Ref<Array<Category>> = ref(this.categoryData);
    itemsRef: Ref<Array<Item>> = ref(this.itemData);

    readonly storeName: string;

    constructor(storeName: string) {
        this.storeName = storeName;
        this.loadLocal();
        // this.categoriesRef.value = this.calcCategories();
    }

    // private calcCategories(): Array<Category> {
    //     const categoryNames = Array.from(new Set(this.itemList.map(elem => elem.category)));
    //     const categories = categoryNames.map(name => this.createCategory(name, this.itemList));
    //     return categories;
    // }

    /**
     * Return the list of known categories
     * @param itemData the items from which to determine the categories
     */
    private calcCategories(itemData: Array<Item>): Array<Category> {
        const categoryNames = Array.from(new Set(itemData.map(elem => elem.category)));
        const categories = categoryNames.map(name => this.createCategory(name, itemData));
        return categories;
    }

    deleteItem(itemId: number) {
        const newList = this.itemsRef.value.filter((item) => item.id != itemId);
        this.categoriesRef.value = this.calcCategories(newList);
        this.itemsRef.value = newList;
        this.storeLocal();
    }

    addItem(item: Item) {
        console.debug("== newList raw = " + this.itemsRef);
        console.debug("== item data raw = " + this.itemData);
        const newList = this.itemsRef.value;
        console.debug("== newList = " + newList);
        newList.push(item);
        this.categoriesRef.value = this.calcCategories(newList);
        this.itemsRef.value = newList;
    }

    toggleCart(item: Item) {
        item.stored = !item.stored;
        this.storeLocal();
        //   this.storeItems(items.value);
    }

    storeLocal() {
        localStorage.setItem(this.storeName, JSON.stringify(this.itemsRef.value));
        console.log("Stored " + this.itemsRef.value.length + " items to localstorage");
    }

    updateQty(itemId: number, qty: number) {
        this.itemsRef.value
            .filter((anItem) => anItem.id == itemId)
            .forEach((anItem) => {
                console.log("increasing qty of " + anItem.name + ":" + anItem.qty);
                anItem.qty = qty;
            });
        this.storeLocal();
        //   itemRepo.storeItems(items.value);
        //   console.log("item = " + item.name + ":" + item.qty);
    }

    updateCategory(itemId: number, categoryName: string) {
        this.itemsRef.value
            .filter((anItem) => anItem.id == itemId)
            .forEach((anItem) => {
                console.log( "changing category of " + anItem.name + " to " + categoryName);
                anItem.category = categoryName;
            });
        this.storeLocal();
        this.categoriesRef.value = this.calcCategories(this.itemsRef.value);
    }

    private createAnItem(id: number, itemName: string, categoryName: string, qty = 1): Item {
        console.log("creating item with id = " + id);
        return {
            id: id,
            name: itemName,
            category: categoryName,
            qty: qty,
            stored: false,
        };
    }

    private createCategory(categoryName: string, itemData: Array<Item>): Category {
        const matchingItems = itemData.filter(item => item.category === categoryName);
        const isDone = matchingItems.every(item => item.stored);
        const categoryId = this.nextCategoryId;
        this.nextCategoryId = this.nextCategoryId + 1;
        return {
            id: categoryId,
            name: categoryName,
            items: matchingItems,
            isDone: isDone
        };
    }

    /**
     * Read data from localstorage
     */
    private loadLocal() {
        try {
            const storedContent = localStorage.getItem(this.storeName);
            if (storedContent) {
                const parsedContent = JSON.parse(storedContent);
                if (Array.isArray(parsedContent)) {
                    this.nextItemId = parsedContent.map(item => item.id).reduce((first, second) => Math.max(first, second), 0);
                    // this.itemList = parsedContent;
                    // this.categoryList = this.calcCategories(this.itemList);
                    this.categoriesRef.value = this.calcCategories(parsedContent);
                    this.itemsRef.value = parsedContent;
                    console.log("Loaded " +
                        this.itemsRef.value.length + " items in " +
                        this.categoriesRef.value.length + " categories from localstore");
                }

            }
        } catch (error) {
            console.log("Error during initalization" + error);
            return [this.createShoppingItem("ERROR", "E:" + error)];
        }
        console.log("No stored items found");
        return [];
    }

    /**
     * Create a shoppping list item
     * @param itemName the name of the item
     * @param categoryName name of the category
     * @param qty required quantity 
     */
    createShoppingItem(itemName: string, categoryName: string, qty = 1): Item {
        this.nextItemId = this.nextItemId + 1;
        console.log("nextItemID = " + this.nextItemId);
        return this.createAnItem(this.nextItemId, itemName, categoryName, qty);
    }

    /**
     * Store items to localStorage
     * @param itemList the list of Item to store
     */
    storeItems(itemList: Array<Item>) {
        console.warn("== IGNORING STOREITEMS FOR NOW!! ")
        localStorage.setItem(this.storeName, JSON.stringify(itemList));
        // this.itemsRef.value = itemList;
        console.log("Stored " + itemList.length + " items to localstorage");
    }

    /**
     * Convert the given item into an item which can be stored on the server
     * @param item the item to convert
     */
    toStorableItem(item: Item): StorableItem {
        const sItem = {
            id: item.id,
            name: item.name,
            qty: item.qty,
            stored: item.stored,
            categoryId: 0
        }
        return sItem;
    }
}

export { Item, Category, ItemRepository };
