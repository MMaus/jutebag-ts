import { mount } from "@vue/test-utils";
import { createStore, Store } from "vuex";

import ShoppingListView from "@/views/ShoppingListView.vue";
import { JuteBagState } from "@/store/types";
import shopping from "@/store/shopping";

describe("The ShoppingList", () => {
  let store: Store<JuteBagState>;

  beforeEach(() => {
    store = createStore({
      modules: {
        shopping,
      },
    });
  });

  it("renders a new Category when it is added to the store", () => {
    const wrapper = mount(ShoppingListView, {
      // store,
      global: {
        plugins: [store],
      },
      props: {
        category: {
          id: 1,
          name: "Cat1",
          items: [],
          isDone: false,
        },
        categorylist: [],
        mitt: {
          on: jest.fn(),
        },
      },
    });
    expect(wrapper.html().includes("Cat1")).toBe(true);
  });
});
