<template>
  <div class="m-0 p-0">
    <div
      v-if="item.stored"
      class="storedItem mt-1 text-success text-left font-weight-bold"
      @click="toggleInCart"
    >
      {{ item.quantity }}x {{ item.name }}
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
        <div class="container-fluid pl-3 text-left mt-1" @click="toggleInCart">
          {{ item.itemName }}
        </div>
        <div class="ml-auto mr-1" aria-label="change quantity">
          <button
            type="button"
            class="btn btn-warning btn-sm"
            @click="toggleCollapse"
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
        <select id="category" ref="category" @change="changeCategory">
          <option
            v-for="cat in categoriesList"
            :key="cat.id"
            :value="cat.catName"
            :selected="cat.name === item.category"
            >{{ cat.catName }}</option
          >
        </select>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ShoppingItem } from "@/store/shopping/types";
import { Category } from "@/use/localApi";
import { defineComponent, inject, PropType, ref } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ShoppingItem>,
      required: true,
    },
  },
  setup(props) {
    const categoriesList = inject("categoriesList") as Array<Category>;
    const showOptions = ref(false);
    function toggleCollapse() {
      showOptions.value = !showOptions.value;
    }
    function notifyDelete() {
      console.log("TO BE DONE: delete item ", props.item);
    }
    function increaseQty() {
      console.log("TO BE DONE: increase qty", props.item);
      // const copy = {} as ShoppingItem;
      // Object.assign(copy, this.item);
      // copy.quantity = this.item.quantity + 1;
      // this.emitChained("update-qty", copy);
    }
    function decreaseQty() {
      console.log("TO BE DONE: decrease qty", props.item);
      // const copy = {} as ShoppingItem;
      // Object.assign(copy, this.item);
      // copy.quantity = this.item.quantity + 1;
      // this.emitChained("update-qty", copy);
    }
    function changeCategory() {
      console.log("TO BE DONE: change category", props.item);
    }
    function toggleInCart() {
      console.log("TO BE DONE: toggle in cart", props.item);
    }
    return {
      categoriesList,
      showOptions,

      toggleCollapse,
      notifyDelete,
      increaseQty,
      decreaseQty,
      changeCategory,
      toggleInCart,
    };
  },
});
</script>
<style scoped>
.stored-item {
  background-color: palegoldenrod;
}
</style>
