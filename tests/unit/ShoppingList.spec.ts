import { mount } from "@vue/test-utils";

import ShoppingList from "@/views/ShoppingList.vue";

describe("The ShoppingList", () => {
  it("renders a new Category when it is added to the store", () => {
    const wrapper = mount(ShoppingList, {
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
