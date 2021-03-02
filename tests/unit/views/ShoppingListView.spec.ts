import { mount } from "@vue/test-utils";
import { createStore, Store } from "vuex";

import ShoppingListView from "@/views/ShoppingListView.vue";
import CategoryPanel from "@/components/shoppinglist/CategoryPanel.vue";
import ShoppingItemDisplay from "@/components/shoppinglist/ShoppingItemDisplay.vue";
import { JuteBagState } from "@/store/types";
import shopping from "@/store/shopping";

describe("The ShoppingList", () => {
  let store: Store<JuteBagState>;

  async function addItem(itemName: string, categoryName: string) {
    await store.dispatch("shopping/addItem", {
      itemName,
      categoryName,
    });
  }

  beforeEach(() => {
    store = createStore({
      modules: {
        shopping,
      },
    });
  });

  it("renders a new category panel when categories appear.", async () => {
    const wrapper = mount(ShoppingListView, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.findAllComponents(CategoryPanel).length).toBe(0);
    await addItem("item1", "cat1");
    expect(wrapper.findAllComponents(CategoryPanel).length).toBe(1);
    await addItem("item2", "cat2");
    expect(wrapper.findAllComponents(CategoryPanel).length).toBe(2);
    await addItem("item3", "cat1");
    expect(wrapper.findAllComponents(CategoryPanel).length).toBe(2);
  });

  it("renders a shopping item for each item that is created.", async () => {
    const wrapper = mount(ShoppingListView, {
      global: {
        plugins: [store],
      },
    });
    await addItem("item1", "cat1");
    expect(wrapper.findAllComponents(ShoppingItemDisplay).length).toBe(1);
    await addItem("item2", "cat2");
    expect(wrapper.findAllComponents(ShoppingItemDisplay).length).toBe(2);
    await addItem("item3", "cat1");
    expect(wrapper.findAllComponents(ShoppingItemDisplay).length).toBe(3);
  });
});
