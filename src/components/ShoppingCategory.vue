<template>
<div class="p-1">
  <div class="card">
    <div
      class="card-header text-left"
      v-bind:class="{'text-success' :  isDone, 'category-done' : isDone}"
      @click="toggleShowNevertheless"
    >
    <div class="row">
      <div class="col">
      <span class="category-title">{{ category.name }}</span>
      </div>
      <div class="col">
        <span class="float-right">
      <button class="btn border" @click="pullCategory">
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-up-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
          <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path fill-rule="evenodd" d="M4.646 8.354a.5.5 0 0 0 .708 0L8 5.707l2.646 2.647a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708z" />
          <path fill-rule="evenodd" d="M8 11.5a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5z" />
        </svg>
      </button>
      <button class="btn border" @click="pushCategory">
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-down-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path fill-rule="evenodd" d="M4.646 7.646a.5.5 0 0 1 .708 0L8 10.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
          <path fill-rule="evenodd" d="M8 4.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5z"/>
        </svg>
      </button>
      </span>
      </div>
    </div>
    </div>
    <div class="card-body" v-if="showItems">
      <to-shop-item v-for="item in items" :key="item.id" :item="item" :categories="categorylist"></to-shop-item>
    </div>
  </div>
</div>
</template>

<script>
import ToShopItem from "@/components/ToShopItem.vue";
import { Category } from "@/use/localApi";

export default {
data: function () {
  return {
    showNevertheless: false,
  };
},

props: {
  category: {
    type: Category,
    required: true,
  },
  categorylist: {
    type: Array,
    required: true,
  },
},

methods: {
  toggleShowNevertheless: function () {
    if (!this.isDone) {
      this.showNevertheless = false; // debatable behaviour
      // deactivate toggling when not done
      return;
    }
    this.showNevertheless = !this.showNevertheless;
  },

  pullCategory: function () {
    this.$emit("pull-category", this.category.name);
  },
  pushCategory: function () {
    this.$emit("push-category", this.category.name);
  },
},

computed: {
  items: function () {
    return this.category.items;
  },
  isDone: function () {
    return this.category.isDone;
  },
  showItems: function () {
    return !this.isDone || this.showNevertheless;
  },
},

components: {
  "to-shop-item": ToShopItem,
},
};
</script>

<style scoped>
.category-title {
  text-transform: capitalize;
  font-size: 120%;
  font-weight: bold;
}
.category-done {
background-color: papayawhip;
}
</style>