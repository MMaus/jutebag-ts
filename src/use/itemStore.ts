interface Category {
    id: number;
    name: string;
    items: Array<Item>;
    isDone: boolean;
}

interface Item {
    id: number;
    name: string;
    category: string;
    qty: number;
    stored: boolean;
}

interface StorableItem {
    id: number;
    name: string;
    qty: number;
    categoryId: number;
    stored: boolean;
}

function createAnItem(id: number, itemName: string, categoryName: string, qty = 1): Item {
    console.log("creating item with id = " + id);
    return {
        id: id,
        name: itemName,
        category: categoryName,
        qty: qty,
        stored: false,
    };
}


class ItemStore {

    nextItemId = 1;
    nextCategoryId = 1;

    splitInCategories(itemData: Array<Item>): Array<Category> {
        const categoryNames = Array.from(new Set(itemData.map(elem => elem.category)));
        const categories = categoryNames.map(name => this.createCategory(name, itemData));
        return categories;
    }

    createCategory(categoryName: string, itemData: Array<Item>): Category {
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

    createShoppingItem(itemName: string, categoryName: string, qty = 1): Item {
        this.nextItemId = this.nextItemId + 1;
        console.log("nextItemID = " + this.nextItemId);
        return createAnItem(this.nextItemId, itemName, categoryName, qty);
    }

    loadItems(): Array<Item> {
        try {
            const storedContent = localStorage.getItem('_jutebag_shoppinglist');
            if (storedContent) {
                const parsedContent = JSON.parse(storedContent);
                if (Array.isArray(parsedContent)) {
                    console.log("Read content with " + parsedContent.length + " items");
                    this.nextItemId = parsedContent.map(item => item.id).reduce((first, second) => Math.max(first, second), 0);
                    return parsedContent;
                }

            }
        } catch (error) {
            console.log("Error during initalization" + error);
            return [this.createShoppingItem("ERROR", "E:" + error)];
        }
        console.log("No stored items found");
        return [];
    }

    storeItems(itemList: Array<Item>) {
        localStorage.setItem('_jutebag_shoppinglist', JSON.stringify(itemList));
    }

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

const itemStore = new ItemStore();

export default itemStore;
export { Item, Category };