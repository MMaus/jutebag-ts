<template>
  <div class="container-fluid p-1 bg-secondary">
    <div v-if="loggedIn">
      <button class="button btn btn-warning" @click="upload">Save</button>
      <button class="button btn btn-warning" @click="download">Load</button>
    </div>
    <hr />
    <div class="d-sm-flex flex-wrap">
      <shopping-category
        v-for="cat in categories"
        :key="cat.name"
        :category="cat"
        :categorylist="categories"
        @toggle-cart="toggleCart"
        @delete-item="deleteItem"
        @update-qty="updateQty"
        @update-category="updateCategory"
      >
        category : {{ cat.name }}, isDone: {{ cat.isDone }}
        items: {{ cat.items }}
      </shopping-category>
    </div>

    <div class="container-fluid mb-3 p-4">
      <br />
    </div>

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
          <button tabindex="5" class="btn btn-primary" type="button" @click="addItem()">Enter Item</button>
        </div>
        <div>
          <button tabindex="6" type="button" class="btn btn-warning" @click="toggleAddItemEnh()">
            <span class="nav-item dropdown-toggle"></span>
          </button>
        </div>
      </div>
      <div class="input-group collapse" v-bind:class="{ show : showAddItemEnh}">
        <select
          tabindex="2"
          id="categoryList"
          ref="categoryList"
          @change="categoryListChange($event)"
          @keyup.enter="addItem()"
        >
          <option value></option>
          <option v-for="cat in categories" :key="cat.name" :value="cat.name">{{cat.name}}</option>
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
          <option v-for="cat in categories" :key="cat.name" :value="cat.name">{{cat.name}}</option>
        </datalist>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

import ShoppingCategory from "@/components/ShoppingCategory.vue";

import * as firebase from "firebase/app";
import "firebase/auth";

import { User } from "firebase/app";
import itemStore from "../use/itemStore";
import { Item, Category } from "../use/itemStore";

function createItem(itemName: string, categoryName: string, qty: number): Item {
  const anItem = itemStore.createShoppingItem(itemName, categoryName, qty);
  console.log("itemId :" + anItem.id);
  return anItem;
}

const initialItems = itemStore.loadItems();

@Component({
  components : {
    "shopping-category" : ShoppingCategory
  }
})
export default class ShopplingList extends Vue {
  @Ref("categoryList") categoryList!: HTMLInputElement;
  @Ref("categoryText") categoryText!: HTMLInputElement;
  @Ref("newItem") newItem!: HTMLInputElement;

  user = "Moritz";
  items = initialItems;
  showAddItemEnh = false;
  newCategory = "";
  loggedIn = false;
  userEmail = "";

  mounted() {
    firebase.auth().onAuthStateChanged(user => this.checkLogin(user));
  }

  /**
   * Add a new item from the input field to cart
   */
  readCategory() {
    let category = this.categoryList.value;
    if (!category) {
      category = this.categoryText.value;
    }
    if (!category) {
      category = "undefined";
    }
    return category;
  }

  checkLogin(user: User | null) {
    if (!user) {
      this.loggedIn = false;
    } else {
      this.loggedIn = user.emailVerified;
      this.userEmail = user.email ?? "<no email>";
    }
  }

  upload() {
    console.log("going to upload " + this.items.length + " items");
    const postData = {
      email: this.userEmail,
      items: this.items.map(item => itemStore.toStorableItem(item))
    };
    console.log("Sending POST with " + JSON.stringify(postData));
    fetch("/bag/saveBag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(json => console.log("received POST result:" + JSON.stringify(json)))
      .catch(err => console.log("POST error: " + err));
  }

  download() {
    const user = firebase.auth().currentUser?.email;
    if (user == null) {
      console.error("Unknown user, cannot download cart items.");
      return;
    }
    console.log("querying items for " + user);
    fetch("/bag/loadBag?user=" + user)
      .then(res => res.json())
      .then(json => this.setNewItems(json))
      .catch(err => console.log(err));
  }

  setNewItems(items: Array<Item>) {
    console.log("received items:" + items);
    console.log("received items:" + JSON.stringify(items));
    items.forEach(it => console.log("an item is " + JSON.stringify(it)));
  }

  addItem() {
    const itemName = this.newItem.value;
    if (!itemName) {
      return;
    }
    const category = this.readCategory();
    this.newItem.value = "";
    this.categoryList.value = "";
    this.categoryText.value = "";
    const newQty = 1; // TODO: parse from string etc.
    const newShoppingItem = createItem(itemName, category, newQty);
    this.items.push(newShoppingItem);
    itemStore.storeItems(this.items);
    console.log("added 1 " + itemName + " to shopping list");
    this.newItem.focus();
  }

  deleteItem(itemId: number) {
    this.items = this.items.filter(item => item.id != itemId);
    itemStore.storeItems(this.items);
  }

  toggleCart(item: Item) {
    item.stored = !item.stored;
    itemStore.storeItems(this.items);
  }

  onInputFocus() {
    console.log("input got focus");
    this.showAddItemEnh = true;
  }

  categoryListChange(event: Event) {
    if (event?.target) {
      this.categoryText.value = "";
    }
  }

  onCategoryTextChange() {
    if (this.categoryText.value) {
      this.categoryList.value = "";
    }
  }

  toggleAddItemEnh() {
    this.showAddItemEnh = !this.showAddItemEnh;
  }

  onBlur() {
    console.log("blurred");
  }

  updateQty(item: Item) {
    const itemId = item.id;
    console.log("filtering for items with id " + itemId);
    this.items
      .filter(anItem => anItem.id == item.id)
      .forEach(anItem => {
        console.log("increasing qty of " + anItem.name + ":" + anItem.qty);
        anItem.qty = item.qty;
      });
    itemStore.storeItems(this.items);
    console.log("item = " + item.name + ":" + item.qty);
  }

  updateCategory(item: Item) {
    const itemId = item.id;
    console.log("filtering for items with id " + itemId);
    this.items
      .filter(anItem => anItem.id == item.id)
      .forEach(anItem => {
        console.log(
          "changing categroy of " + anItem.name + " to " + item.category
        );
        anItem.category = item.category;
      });
    itemStore.storeItems(this.items);
    console.log("item = " + item.name + ":" + item.qty);
  }

  // "get" makes this a "computed property"
  get categories() {
    return itemStore.splitInCategories(this.items);
  }

}
</script>

<style scoped>
.newItems {
  background-color: #ffeaed;
}
</style>
