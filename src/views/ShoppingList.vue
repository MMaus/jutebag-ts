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
          <!-- <option value="foo">foo</option>
        <option value="bar">bar</option>
          <option value="baz">baz</option>-->
        </datalist>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingCategory from "@/components/ShoppingCategory.vue";

import * as firebase from "firebase/app";
import "firebase/auth";

import itemStore from "../use/itemStore";

function createItem(itemName, categoryName, qty) {
  const anItem = itemStore.createShoppingItem(itemName, categoryName, qty);
  console.log("itemId :" + anItem.id);
  return anItem;
}

const initialItems = itemStore.loadItems();

export default {
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => this.checkLogin(user));
  },

  data: function() {
    return {
      user: "Moritz",
      items: initialItems,
      showAddItemEnh: false,
      newCategory: "",
      someCats: ["Primary", "Secondary", "Tertiary", "Quartary"],
      loggedIn: false,
      userEmail : ""
    };
  },
  methods: {
    /**
     * Add a new item from the input field to cart
     */
    readCategory: function() {
      let category = this.$refs.categoryList.value;
      if (!category) {
        category = this.$refs.categoryText.value;
      }
      if (!category) {
        category = "undefined";
      }
      return category;
    },

    checkLogin: function(user) {
      if (!user) {
        this.loggedIn = false;
      } else {
        this.loggedIn = user.emailVerified;
        this.userEmail = user.email;
      }
    },

    upload: function() {
      console.log("going to upload " + this.items.length + " items");
      const postData = {
        email : this.userEmail,
        items : this.items.map(item => itemStore.toStorableItem(item))
      }
      console.log("Sending POST with " + JSON.stringify(postData))
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
    },

    download: function() {
      const user = firebase.auth().currentUser.email;
      console.log("querying items for " + user);
      fetch("/bag/loadBag?user=" + user)
        .then(res => res.json())
        .then(json => this.setNewItems(json))
        .catch(err => console.log(err));
    },

    setNewItems: function(items) {
      console.log("received items:" + items);
      console.log("received items:" + JSON.stringify(items));
      items.forEach(it => console.log("an item is " + JSON.stringify(it)));
    },

    addItem: function() {
      const itemName = this.$refs.newItem.value;
      if (!itemName) {
        return;
      }
      const category = this.readCategory();
      this.$refs.newItem.value = "";
      this.$refs.categoryList.value = "";
      this.$refs.categoryText.value = "";
      const newQty = 1; // TODO: parse from string etc.
      const newShoppingItem = createItem(itemName, category, newQty);
      this.items.push(newShoppingItem);
      itemStore.storeItems(this.items);
      console.log("added 1 " + itemName + " to shopping list");
      this.$refs.newItem.focus();
    },
    deleteItem: function(itemId) {
      this.items = this.items.filter(item => item.id != itemId);
      itemStore.storeItems(this.items);
    },
    toggleCart: function(item) {
      item.stored = !item.stored;
      itemStore.storeItems(this.items);
    },

    onInputFocus: function() {
      console.log("input got focus");
      this.showAddItemEnh = true;
    },
    categoryListChange: function(event) {
      if (event.target.value) {
        this.$refs.categoryText.value = "";
      }
    },
    onCategoryTextChange: function() {
      if (this.$refs.categoryText.value) {
        this.$refs.categoryList.value = "";
      }
    },
    toggleAddItemEnh: function() {
      this.showAddItemEnh = !this.showAddItemEnh;
    },
    onBlur: function() {
      console.log("blurred");
    },
    updateQty: function(item) {
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
    },
    updateCategory: function(item) {
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
  },
  computed: {
    categories: function() {
      return itemStore.splitInCategories(this.items);
    }
  },
  components: {
    "shopping-category": ShoppingCategory
  }
};
</script>
<style scoped>
.newItems {
  background-color: #ffeaed;
}
</style>
