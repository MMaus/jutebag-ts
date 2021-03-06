<template>
  <div class="bg-secondary shopping-background max">
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

    <!-- FIXME: pass in somehow category selector ... or use provide / inject -->
    <div class="container mb-5">
      <div class="row px-1">
        <category-panel
          v-for="cat in storedCategories"
          :key="cat.id"
          :category="cat"
          :id="cat.id"
          :mitt="emitter"
          :categorylist="categoriesReactive"
          v-on="categoryCallbacks"
        >
        </category-panel>
      </div>
    </div>

    <div class="spacer"></div>

    <shopping-list-footer @toggle-sidebar="toggleSidebar" />
  </div>
</template>

<script lang="ts">
import { Ref, provide, readonly } from "vue";

import ShoppingListFooter from "@/components/shoppinglist/ShoppingListFooter.vue";
import CategoriesSidebar from "@/components/shoppinglist/CategoriesSidebar.vue";
import CategoryPanel from "@/components/shoppinglist/CategoryPanel.vue";

// import firebase from "firebase/app";

import mitt from "mitt";

import { ItemRepository } from "../use/itemStore";
import { Item, Category } from "../use/localApi";

import { defineComponent, computed, ref } from "vue";

import { Store, useStore } from "vuex";
import { ShoppingItem } from "@/store/shopping/types";
import { JuteBagState } from "@/store/types";

const itemRepo = new ItemRepository("jutebag.shoppinglist");
// const initialItems = itemRepo.itemList;
const emitter = mitt();

// function createItem(itemName: string, categoryName: string, qty: number): Item {
//   const anItem = itemRepo.createShoppingItem(itemName, categoryName, qty);
//   console.log("itemId :" + anItem.id);
//   return anItem;
// }

export default defineComponent({
  setup() {
    const store = useStore() as Store<JuteBagState>;

    provide("categoriesList", readonly(store.getters["shopping/categories"]));

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
    const sidebarVisible = ref(false);

    // properties to be filled by the setup method
    const newItem: Ref<null | HTMLInputElement> = ref(null);
    const categoryText: Ref<null | HTMLInputElement> = ref(null);
    const categoryList: Ref<null | HTMLSelectElement> = ref(null);

    const upload = () => {
      console.log("TODO: commit upload action to store");
      // itemRepo.upload(userEmail.value);
    };

    const download = () => {
      console.log("TODO: download from store!");
      // const user = firebase.auth().currentUser?.email;
      // if (user == null) {
      //   console.error("Unknown user, cannot download cart items.");
      //   return;
      // }
      // itemRepo.download(user);
    };

    const deleteItem = (itemId: number) => {
      itemRepo.deleteItem(itemId);
    };

    const toggleCart = (item: Item) => {
      console.log(`heard toggle cart for ${item.name}`);
      itemRepo.toggleCart(item);
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

    const categoryCallbacks = {
      "toggle-cart": function(item: ShoppingItem) {
        console.log("====== toggle-cart called for", item); // ?? not cats!
      },
      toggleCart: function(item: ShoppingItem) {
        console.log("====== toggleCart called for item", item);
      },
      "delete-item": function(item: ShoppingItem) {
        console.log("delete item called for", item);
      },
      "update-qty": function(item: ShoppingItem) {
        console.log("update qty for item", item);
      },
      "update-category": function(item: ShoppingItem) {
        console.log("update category for item", item);
      },
      "pull-category": function(cat: Category) {
        console.log("pull category category ", cat);
      },
      pullCategory: function(cat: Category) {
        console.log("pullCategory called for ", cat);
      },
      "push-category": function(cat: Category) {
        console.log("push category category ", cat);
      },
      // @delete-item="deleteItem"
      // @update-qty="updateQty"
      // @update-category="updateCategory"
      // @pull-category="pullCategory"
      // @push-category="pushCategory"
    };

    return {
      storedCategories,
      categoryCallbacks,

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
      emitter,
      // Cart change functionality
      upload,
      download,
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

.max {
  min-height: 80vh;
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
</style>
