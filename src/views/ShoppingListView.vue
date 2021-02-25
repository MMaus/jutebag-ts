<template>
  <div class="bg-secondary shopping-background">
    <transition>
      <categories-sidebar
        v-if="sidebarVisible"
        :categories="categoriesReactive"
        @categorySelected="scrollToCategory"
      />
    </transition>
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
          :id="'cat:' + cat.name"
          :mitt="emitter"
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

    <div class="container mb-5">
      <div class="row px-1">
        <category-panel
          v-for="cat in storedCategories"
          :key="cat.id"
          :category="cat"
          :id="cat.id"
          :mitt="emitter"
          :categorylist="categoriesReactive"
          @toggle-cart="toggleCart"
          @delete-item="deleteItem"
          @update-qty="updateQty"
          @update-category="updateCategory"
          @pull-category="pullCategory"
          @push-category="pushCategory"
        >
        </category-panel>
      </div>
    </div>

    <div class="spacer"></div>

    <shopping-list-footer @toggle-sidebar="toggleSidebar" />
  </div>
</template>

<script lang="ts">
import { Ref, reactive } from "vue";

import ShoppingCategory from "@/components/shoppinglist/ShoppingCategory.vue";
import ShoppingListFooter from "@/components/shoppinglist/ShoppingListFooter.vue";
import CategoriesSidebar from "@/components/shoppinglist/CategoriesSidebar.vue";
import CategoryPanel from "@/components/shoppinglist/CategoryPanel.vue";

import firebase from "firebase/app";
import auth from "firebase/auth";

import mitt from "mitt";

import { ItemRepository } from "../use/itemStore";
import { Item, Category } from "../use/localApi";

import { defineComponent, onMounted, computed, ref } from "vue";

import { useStore } from "vuex";
import { importState } from "@/store/shopping/importer";

const itemRepo = new ItemRepository("jutebag.shoppinglist");
// const initialItems = itemRepo.itemList;
const emitter = mitt();

function createItem(itemName: string, categoryName: string, qty: number): Item {
  const anItem = itemRepo.createShoppingItem(itemName, categoryName, qty);
  console.log("itemId :" + anItem.id);
  return anItem;
}

export default defineComponent({
  setup() {
    const store = useStore();

    // FIXME: add type information
    const storedCategories = computed(
      () => store.getters["shopping/categories"]
    );

    const user = ref(""); // some initial value

    // note: this is a reactive vue property ("ref")
    const items: Ref<Array<Item>> = itemRepo.itemsRef;
    const categoriesReactive: Array<Category> = itemRepo.categoriesReactive;

    const showAddItemEnh = ref(false);
    const newCategory = ref("");
    const loggedIn = ref(false);
    const userEmail = ref("");
    const sidebarVisible = ref(true);

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

    const checkLogin = (user: any | null) => {
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

    const toggleSidebar = function() {
      sidebarVisible.value = !sidebarVisible.value;
    };

    const scrollToCategory = function(catName: string) {
      console.log(`that cat is ${catName}`);

      const catElem = document.getElementById("cat:" + catName);
      const headerOffset = 56;
      const elementPosition = catElem?.getBoundingClientRect().top;
      console.log("elem top:" + elementPosition);
      const elemPos2 = catElem?.offsetTop;
      console.log("elem offsetTop:" + elemPos2);

      // const offsetPosition = elementPosition ?? -headerOffset;
      const offsetPosition = elemPos2! - headerOffset;
      console.log(`scrolling to ${offsetPosition}`);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      // catElem?.scrollIntoView();
      sidebarVisible.value = false;
      emitter.emit("do-open", catName);
    };

    onMounted(() => {
      // just a synatx reminder for myself:
      // `checkLogin` is short for `user => checkLogin(user)`
      console.log("(Re-)Initialized ShoppingList");
      // items.value = itemRepo.itemList;
      firebase.auth().onAuthStateChanged(checkLogin);
    });

    return {
      storedCategories,

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
      //
      emitter,
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
      toggleSidebar,
      sidebarVisible,
      scrollToCategory,
    };
  },

  components: {
    "shopping-category": ShoppingCategory,
    ShoppingListFooter,
    CategoriesSidebar,
    CategoryPanel,
  },
});
</script>

<style scoped>
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

.category-button {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  padding-left: 0.5rem;
  margin-left: 20px;
  /* background-color: azure; */
  width: 100%;
  text-align: left;
  color: antiquewhite;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-50vw);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-in-out;
}

.v-enter-to,
.v-leave-from {
  transform: translateX(0);
}

/* .category-done-sidebar {
  font-size: 0.8rem;
  font-weight: lighter;
  padding-left: 20px;
}
.category-active-sidebar {
  font-size: 1rem;
  font-weight: bold;
  padding-left: 5px;
} */

/* one way to fix the scrollbar issue */
/* .row {
  margin-left: 0px;
  margin-right: 0px;
} */
</style>
