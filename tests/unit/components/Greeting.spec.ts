import { mount } from "@vue/test-utils";
import Greeting from "@/components/Greeting.vue";
import { Category } from "@/use/localApi";

describe("Greeting.vue", () => {
  it("renders a greeting", () => {
    const wrapper = mount(Greeting);
    console.log(wrapper.html());
  });
});
