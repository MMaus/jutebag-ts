/**
 * Interfaces for local (i.e. frontend) use.
 * API towards the backend might differ.
 */

/**
 * Provides a sequence for the given categories.
 */
interface CategorySequencer {

    getSequence(unsorted: Array<Category>): (Array<Category>); 


}


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

export { Item, Category, CategorySequencer };
