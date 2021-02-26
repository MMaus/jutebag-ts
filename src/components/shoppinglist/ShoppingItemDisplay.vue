<template>
  <div class="m-0 p-0">
    <div
      v-if="item.stored"
      class="storedItem mt-1 text-success text-left font-weight-bold"
      v-on:click="onClickHandler"
    >
      {{ item.qty }}x {{ item.name }}
    </div>

    <div v-else class="bg-secondary rounded p-0 m-1">
      <div class="d-flex py-1 align-items-center font-weight-bold text-light">
        <div class="pl-1 text-left">
          <div class="btn-group m-0 p-0" role="group">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              v-on:click="decreaseQty"
            >
              -
            </button>
            <button
              type="button"
              class="btn btn-outline-primary bg-white btn-sm"
            >
              <b>{{ item.quantity }}</b>
            </button>
            <button
              type="button"
              class="btn btn-primary btn-sm"
              v-on:click="increaseQty"
            >
              +
            </button>
          </div>
        </div>
        <div
          class="container-fluid pl-3 text-left mt-1"
          @click="onClickHandler"
        >
          {{ item.itemName }}
        </div>
        <div class="ml-auto mr-1" aria-label="change quantity">
          <button
            type="button"
            class="btn btn-warning btn-sm"
            v-on:click="toggleCollapse()"
          >
            <span class="nav-item dropdown-toggle"></span>
          </button>
        </div>
      </div>
      <div class="collapse pt-2" v-bind:class="{ show: showOptions }">
        <button
          class="btn btn-danger text-white font-weight-bold mr-3"
          v-on:click="notifyDelete()"
        >
          x
        </button>
        <select id="category" ref="category" @change="changeCategory($event)">
          <option
            v-for="cat in categories"
            :key="cat.name"
            :value="cat.name"
            :selected="cat.name === item.category"
            >{{ cat.name }}</option
          >
        </select>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ShoppingItem } from "@/store/shopping/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  data: function() {
    return {
      showOptions: false,
    };
  },
  methods: {
    toggleCollapse: function() {
      this.showOptions = !this.showOptions;
    },
    notifyDelete: function() {
      this.emitChained("delete-item", this.item.id);
      console.log("Deleting " + this.item.itemName);
    },
    increaseQty: function() {
      const copy = {} as ShoppingItem;
      Object.assign(copy, this.item);
      copy.quantity = this.item.quantity + 1;
      this.emitChained("update-qty", copy);
    },

    emitChained: function(eventName: string, eventData: unknown) {
      console.log(`emitting ${eventName} with data:`, eventData);
      this.$emit(eventName, eventData);
      console.log("done emitting");
      let vm = this.$parent;
      while (vm) {
        console.log("emitting to:", vm);
        vm.$emit(eventName, eventData);
        vm = vm.$parent;
      }
    },

    changeCategory: function(event: Event) {
      throw new Error("Changing Category is not implemented yet!");
      // const copy = {} as ShoppingItem;
      // Object.assign(copy, this.item);
      // copy.category = event.target.value;
      // this.emitChained("update-category", copy);
      // console.log(
      //   "Category of " + this.item.name + " changed to " + event.target.value
      // );
    },

    decreaseQty: function() {
      const copy = {} as ShoppingItem;
      Object.assign(copy, this.item);
      copy.quantity = this.item.quantity - 1;
      this.emitChained("update-qty", copy);
    },

    onClickHandler: function() {
      console.log(`toggling item ${this.item.itemName}`);
      this.emitChained("toggle-cart", this.item);
    },
  },
  props: {
    item: {
      type: Object as PropType<ShoppingItem>,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
});
</script>
<style scoped>
.stored-item {
  background-color: palegoldenrod;
}
</style>
