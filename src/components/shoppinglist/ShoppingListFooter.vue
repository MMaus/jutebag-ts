<template>
  <footer class="footer fixed-bottom">
    <div class="d-flex p-2 new-item-block">
      <div class="">
        <button
          class="btn shadow-sm bg-white"
          type="button"
          @click="toggleSidebar"
        >
          <span v-if="!sidebarVisible">&gt;</span>
          <span v-else>&lt;</span>
        </button>
      </div>
      <div class="flex-grow-1">
        <div class="input-group mb-2 p-1">
          <input
            type="text"
            class="form-control"
            id="newWhishlistItem"
            v-model="newItemName"
            ref="newItemInput"
            v-on:keyup.enter="addItem()"
            tabindex="1"
            @focus="onInputFocus()"
            placeholder="add item here"
          />
          <div class="input-group-append">
            <button
              tabindex="5"
              class="btn btn-primary"
              type="button"
              @click="addItem()"
            >
              Enter Item
            </button>
          </div>
          <div>
            <button
              tabindex="6"
              type="button"
              class="btn btn-warning"
              @click="toggleAddItemEnh()"
            >
              <span class="nav-item dropdown-toggle"></span>
            </button>
          </div>
        </div>
        <div
          class="input-group collapse"
          v-bind:class="{ show: showAddItemEnh }"
        >
          <select
            tabindex="2"
            id="categoryList"
            ref="categoryList"
            @change="categoryListChange($event)"
            @keyup.enter="addItem()"
          >
            <option value></option>
            <option
              v-for="cat in categoriesReactive"
              :key="cat.name"
              :value="cat.name"
              >{{ cat.name }}</option
            >
          </select>
          <input
            type="text"
            list="categorylist"
            class="form-control"
            id="categoryText"
            v-model="categoryText"
            tabindex="3"
            @keypress="onCategoryTextChange"
            @keyup.enter="addItem()"
            placeholder="new category"
          />
          <datalist id="categorylist">
            <option
              v-for="cat in categoriesReactive"
              :key="cat.name"
              :value="cat.name"
              >{{ cat.name }}</option
            >
          </datalist>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Ref } from "vue";

import ShoppingCategory from "@/components/shoppinglist/ShoppingCategory.vue";

import mitt from "mitt";

import { Item, Category } from "@/use/localApi";

import { defineComponent, onMounted, ref } from "vue";

// function createItem(itemName: string, categoryName: string, qty: number): Item {
//   const anItem = itemRepo.createShoppingItem(itemName, categoryName, qty);
//   console.log("itemId :" + anItem.id);
//   return anItem;
// }
function createItem(itemName: string, categoryName: string, qty: number): Item {
  return {
    id: 999 /* BROKEN! CREATE IDS TO GO (USE STORE)*/,
    name: itemName,
    category: categoryName,
    qty: qty,
    stored: false,
  };
}

export default defineComponent({
  emits: ["toggle-sidebar"],
  setup(_, context) {
    const showAddItemEnh = ref(false);
    const newCategory = ref("");
    const sidebarVisible = ref(false);

    // properties to be filled by the setup method
    const newItemText = ref("");
    const categoryText = ref("");
    const categoryList: Ref<null | HTMLSelectElement> = ref(null);
    const newItemRef: Ref<null | HTMLInputElement> = ref(null);

    /**
     * Add a new item from the input field to cart
     */
    const readCategory: () => string = () => {
      let category: string | undefined = categoryList.value?.value;
      if (!category) {
        category = categoryText.value;
      }
      if (!category) {
        category = "undefined";
      }
      return category;
    };

    const addItem = () => {
      const itemName = newItemText.value;
      if (!itemName) {
        return;
      }
      const category = readCategory();
      newItemText.value = "";
      categoryList.value!.value = "";
      categoryText.value = "";
      const newQty = 1; // TODO: parse from string etc.; e.g. "milk !!!"" => 3x milk
      const newShoppingItem = createItem(itemName!, category, newQty);
      //   itemRepo.addItem(newShoppingItem);
      console.log("added 1 " + itemName + " to shopping list");
      newItemRef.value?.focus();
    };

    const onInputFocus = () => {
      console.log("input got focus");
      showAddItemEnh.value = true;
    };

    const categoryListChange = (event: Event) => {
      console.log("Category List Change! event target=" + event?.target);
      if (event?.target) {
        categoryText.value = "";
      }
    };

    const onCategoryTextChange = () => {
      console.log("Category Text Change! event target=" + event?.target);
      if (categoryText.value) {
        categoryList.value!.value = "";
      }
    };

    const toggleAddItemEnh = () => {
      showAddItemEnh.value = !showAddItemEnh.value;
    };

    const toggleSidebar = function() {
      context.emit("toggle-sidebar");
      sidebarVisible.value = !sidebarVisible.value;
    };

    // const scrollToCategory = function(catName: string) {
    //   console.log(`that cat is ${catName}`);

    //   const catElem = document.getElementById("cat:" + catName);
    //   const headerOffset = 56;
    //   const elementPosition = catElem?.getBoundingClientRect().top;
    //   console.log("elem top:" + elementPosition);
    //   const elemPos2 = catElem?.offsetTop;
    //   console.log("elem offsetTop:" + elemPos2);

    //   // const offsetPosition = elementPosition ?? -headerOffset;
    //   if (elemPos2 === undefined) {
    //     return;
    //   }
    //   const offsetPosition = elemPos2 - headerOffset;
    //   console.log(`scrolling to ${offsetPosition}`);
    //   window.scrollTo({
    //     top: offsetPosition,
    //     behavior: "smooth",
    //   });
    //   // catElem?.scrollIntoView();
    //   sidebarVisible.value = false;
    //   // FIXME: find replacement for this! E.g. via store
    //   //   emitter.emit("do-open", catName);
    // };

    return {
      showAddItemEnh,
      newCategory,
      newItemText,
      categoryText,
      categoryList,
      // UI functionality
      newItemRef,
      onInputFocus,
      categoryListChange,
      onCategoryTextChange,
      toggleAddItemEnh,
      addItem,
      toggleSidebar,
      sidebarVisible,
      //   scrollToCategory,
    };
  },
});
</script>
<style scoped>
.new-item-block {
  background-color: #ffeaed;
}
</style>
