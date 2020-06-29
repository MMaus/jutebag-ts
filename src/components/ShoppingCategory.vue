<template>
  <div class="p-1">
    <div class="card">
      <div class="card-header text-left" 
      v-bind:class="{'text-success' :  isDone, 'category-done' : isDone}"
      
      @click="toggleShowNevertheless">
        <h5 class="category-title">{{ category.name }}</h5>
      </div>
      <div class="card-body" v-if="showItems">
        <to-shop-item v-for="item in items" :key="item.id" :item="item" :categories="categorylist"></to-shop-item>
      </div>
    </div>
  </div>
</template>

<script>
import ToShopItem from "@/components/ToShopItem.vue";
export default {
  data: function() {
    return {
      showNevertheless: false
    };
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    categorylist : {
      type : Array,
      required : true
    }
  },
  methods: {
    toggleShowNevertheless: function() {
      if (!this.isDone) {
        this.showNevertheless = false; // debatable behaviour
        // deactivate toggling when not done
        return;
      }
      this.showNevertheless = !this.showNevertheless;
      console.log("showNEvertheless is " + this.showNevertheless);
    }
  },
  computed: {
    items: function() {
      return this.category.items;
    },
    isDone: function() {
      return this.category.isDone;
    },
    showItems: function() {
      return !this.isDone || this.showNevertheless;
    }
  },
  components: {
    "to-shop-item": ToShopItem
  }
};
</script>

<style scoped>
.category-title {
  text-transform: capitalize;
}
.category-done {
  background-color:papayawhip
}
</style>