
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
    itemList: Array<Item> = [];
    categoryList: Array<Category> = [];

    readonly storeName: string;

    constructor(storeName: string) {
        this.storeName = storeName;
        this.loadLocal();
    }

    /**
     * Return the list of known categories
     * @param itemData the items from which to determine the categories
     */
    getCategories(itemData: Array<Item>): Array<Category> {
        const categoryNames = Array.from(new Set(itemData.map(elem => elem.category)));
        const categories = categoryNames.map(name => this.createCategory(name, itemData));
        return categories;
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

    loadLocal() {
        try {
            const storedContent = localStorage.getItem(this.storeName);
            if (storedContent) {
                const parsedContent = JSON.parse(storedContent);
                if (Array.isArray(parsedContent)) {
                    this.nextItemId = parsedContent.map(item => item.id).reduce((first, second) => Math.max(first, second), 0);
                    this.itemList = parsedContent;
                    this.categoryList = this.getCategories(this.itemList);
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

    storeItems(itemList: Array<Item>) {
        localStorage.setItem(this.storeName, JSON.stringify(itemList));
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