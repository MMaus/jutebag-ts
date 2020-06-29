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
    suppliers: Array<string>;
}

function createAnItem(id: number, itemName: string, categoryName: string, qty = 1) {
    console.log("creating item with id = " + id);
    return {
        id: id,
        name: itemName,
        category: categoryName,
        qty: qty,
        stored: false,
        suppliers: []
    };

}

const itemStore = {

    nextItemId: 1,
    nextCategoryId: 1,

    splitInCategories: function (itemData: Array<Item>) {
        const categoryNames = Array.from(new Set(itemData.map(elem => elem.category)));
        const categories = categoryNames.map(name => this.createCategory(name, itemData));
        return categories;
    },

    createCategory: function (categoryName: string, itemData: Array<Item>) {
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
    },

    createShoppingItem: function (itemName: string, categoryName: string, qty = 1) {
        this.nextItemId = this.nextItemId + 1;
        console.log("nextItemID = " + this.nextItemId);
        return createAnItem(this.nextItemId, itemName, categoryName, qty);
    },

    loadItems: function () {
        const storedContent = localStorage.getItem('_jutebag_shoppinglist');
        if (storedContent) {
            const parsedContent = JSON.parse(storedContent);
            if (Array.isArray(parsedContent)) {
                console.log("Read content with " + parsedContent.length + " items");
                this.nextItemId = parsedContent.map(item => item.id).reduce((first, second) => Math.max(first, second), 0);
                return parsedContent;
            }

        }
        console.log("No stored items found");
        return [];
    },

    storeItems: function (itemList: Array<Item>) {
        localStorage.setItem('_jutebag_shoppinglist', JSON.stringify(itemList));
    },

}

export default itemStore;