<template>
  <div class="bg-secondary p-1">
    <div v-if="loggedIn">
      <button class="button btn btn-warning" @click="upload">Save</button>
      <button class="button btn btn-warning" @click="download">Load</button>
      <hr />
    </div>

    <div class="container">
      <div class="row">
        <shopping-category
          v-for="cat in categoriesReactive"
          :key="cat.name"
          :category="cat"
          :categorylist="categoriesReactive"
          @toggle-cart="toggleCart"
          @delete-item="deleteItem"
          @update-qty="updateQty"
          @update-category="updateCategory"
          @pull-category="pullCategory"
          @push-category="pushCategory"
        >
        </shopping-category>
      </div>
    </div>

    <div class="m-0 mt5 spacer"></div>

    <div class="p-2 newItems fixed-bottom">
      <div class="input-group mb-2 p-1">
        <input
          type="text"
          class="form-control"
          id="newWhishlistItem"
          ref="newItem"
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
      <div class="input-group collapse" v-bind:class="{ show: showAddItemEnh }">
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
          ref="categoryText"
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
</template>

<script lang="ts">
import { Ref, reactive } from "vue";

import ShoppingCategory from "@/components/ShoppingCategory.vue";

import * as firebase from "firebase/app";
import "firebase/auth";

import { User } from "firebase/app";
import { ItemRepository } from "../use/itemStore";
import { Item, Category } from "../use/localApi";

import { defineComponent, onMounted, computed, ref } from "vue";

const itemRepo = new ItemRepository("jutebag.shoppinglist");
// const initialItems = itemRepo.itemList;

function createItem(itemName: string, categoryName: string, qty: number): Item {
  const anItem = itemRepo.createShoppingItem(itemName, categoryName, qty);
  console.log("itemId :" + anItem.id);
  return anItem;
}

export default defineComponent({
  setup() {
    const user = ref("Moritz"); // some initial value

    // note: this is a reactive vue property ("ref")
    const items: Ref<Array<Item>> = itemRepo.itemsRef;
    const categoriesReactive: Array<Category> = itemRepo.categoriesReactive;

    const showAddItemEnh = ref(false);
    const newCategory = ref("");
    const loggedIn = ref(false);
    const userEmail = ref("");

    // properties to be filled by the setup method
    const newItem: Ref<null | HTMLInputElement> = ref(null);
    const categoryText: Ref<null | HTMLInputElement> = ref(null);
    const categoryList: Ref<null | HTMLSelectElement> = ref(null);

    /**
     * Add a new item from the input field to cart
     */
    const readCategory: () => string = () => {
      let category: string | undefined = categoryList.value?.value;
      if (!category) {
        category = categoryText.value?.value;
      }
      if (!category) {
        category = "undefined";
      }
      return category;
    };

    const checkLogin = (user: User | null) => {
      if (!user) {
        loggedIn.value = false;
      } else {
        loggedIn.value = user.emailVerified;
        userEmail.value = user.email ?? "<no email>";
      }
    };

    const upload = () => {
      itemRepo.upload(userEmail.value);
    };

    const download = () => {
      const user = firebase.auth().currentUser?.email;
      if (user == null) {
        console.error("Unknown user, cannot download cart items.");
        return;
      }
      itemRepo.download(user);
    };

    const addItem = () => {
      const itemName = newItem.value?.value;
      if (!itemName) {
        return;
      }
      const category = readCategory();
      newItem.value!.value = "";
      categoryList.value!.value = "";
      categoryText.value!.value = "";
      const newQty = 1; // TODO: parse from string etc.; e.g. "milk !!!"" => 3x milk
      const newShoppingItem = createItem(itemName!, category, newQty);
      itemRepo.addItem(newShoppingItem);
      console.log("added 1 " + itemName + " to shopping list");
      newItem.value!.focus();
    };

    const deleteItem = (itemId: number) => {
      itemRepo.deleteItem(itemId);
    };

    const toggleCart = (item: Item) => {
      console.log(`heard toggle cart for ${item.name}`);
      itemRepo.toggleCart(item);
    };

    const onInputFocus = () => {
      console.log("input got focus");
      showAddItemEnh.value = true;
    };

    const categoryListChange = (event: Event) => {
      console.log("Category List Change! event target=" + event?.target);
      if (event?.target) {
        categoryText.value!.value = "";
      }
    };

    const onCategoryTextChange = () => {
      console.log("Category Text Change! event target=" + event?.target);
      if (categoryText.value?.value) {
        categoryList.value!.value = "";
      }
    };

    const toggleAddItemEnh = () => {
      showAddItemEnh.value = !showAddItemEnh.value;
    };

    const updateQty = (item: Item) => {
      itemRepo.updateQty(item.id, item.qty);
    };

    const updateCategory = (item: Item) => {
      itemRepo.updateCategory(item.id, item.category);
    };

    const pullCategory = (categoryName: string) => {
      itemRepo.pullCategory(categoryName);
    };

    const pushCategory = (categoryName: string) => {
      itemRepo.pushCategory(categoryName);
    };

    onMounted(() => {
      // just a synatx reminder for myself:
      // `checkLogin` is short for `user => checkLogin(user)`
      console.log("(Re-)Initialized ShoppingList");
      // items.value = itemRepo.itemList;
      firebase.auth().onAuthStateChanged(checkLogin);
    });

    return {
      user,
      items,
      showAddItemEnh,
      newCategory,
      loggedIn,
      userEmail,
      newItem,
      categoryText,
      categoryList,
      categoriesReactive,
      // UI functionality
      onInputFocus,
      categoryListChange,
      onCategoryTextChange,
      toggleAddItemEnh,
      // Cart change functionality
      upload,
      download,
      addItem,
      deleteItem,
      toggleCart,
      updateQty,
      updateCategory,
      pushCategory,
      pullCategory,
    };
  },

  components: {
    "shopping-category": ShoppingCategory,
  },
});
</script>

<style scoped>
.newItems {
  background-color: #ffeaed;
}

.spacer {
  height: 10rem;
}

/* one way to fix the scrollbar issue */
/* .row {
  margin-left: 0px;
  margin-right: 0px;
} */
</style>
