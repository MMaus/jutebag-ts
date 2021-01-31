<template>
  <div class="bg-secondary shopping-background">
    <div id="sidebar-wrapper" class="sidebar" v-if="sidebarVisible">
      SIDEBAR
      <div class="sidebar-content">
        <ul>
          <li
            v-for="cat in categoriesReactive"
            :key="cat.name"
            class="text-left"
          >
            <span
              :class="{
                'font-weight-bold': !cat.isDone,
                'font-weight-light font-italic px-2': cat.isDone,
              }"
              >{{ cat.name }}</span
            >
          </li>
        </ul>
      </div>
    </div>
    <div v-if="loggedIn" class="cardly">
      <button class="button btn btn-warning rounded" @click="upload">
        Save
      </button>
      <button class="button btn btn-warning rounded ml-2" @click="download">
        Load
      </button>
    </div>

    <div class="container mb-5">
      <div class="row px-1">
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

    <div class="spacer"></div>

    <footer class="footer fixed-bottom">
      <div class="d-flex p-2 new-item-block">
        <div class="">
          <button
            class="btn shadow-sm bg-white"
            type="button"
            @click="showSidebar"
          >
            <span v-if="!sidebarVisible">&gt;</span>
            <span v-else>&lt;</span>
            <!-- <span class="navbar-toggler-icon text-right"></span> -->
          </button>
        </div>
        <div class="flex-grow-1">
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
    </footer>
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
    const sidebarVisible = ref(false);

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

    const showSidebar = function() {
      sidebarVisible.value = !sidebarVisible.value;
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
      showSidebar,
      sidebarVisible,
    };
  },

  components: {
    "shopping-category": ShoppingCategory,
  },
});
</script>

<style scoped>
.new-item-block {
  background-color: #ffeaed;
}

.spacer {
  height: 5rem;
}

.shopping-background {
  background-image: url("../assets/background-2.jpg");
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  /* filter: saturate(0.35); */
}

.cardly {
  padding: 0.25rem;
  border-radius: 0.25rem;
  background-color: rgba(225, 213, 233, 0.95);
}

.sidebar {
  background-color: indigo;
  color: aliceblue;
  position: fixed;
  bottom: 70px;
  margin-left: 0;
  padding-left: 0;
  max-width: 75vw;
  z-index: 5000;
  overflow: scroll;
  max-height: 70vh;
}

.sidebar-content {
  /* overflow: scroll; */
  text-align: left;
}

/* one way to fix the scrollbar issue */
/* .row {
  margin-left: 0px;
  margin-right: 0px;
} */
</style>
