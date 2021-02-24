<template>
  <div class="sidebar">
    <h5 class="p-2">Categories</h5>
    <div class="sidebar-content">
      <div class="m-0 p-0 text-left" v-for="cat in categories" :key="cat.name">
        <button
          class="btn shadow m-0 p-0 category-button px-1"
          @click="selectCategory(cat.name)"
        >
          <span
            :class="{
              'category-active-sidebar': !cat.isDone,
              'category-done-sidebar': cat.isDone,
            }"
          >
            {{ cat.name }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType, SetupContext } from "vue";
import { Category } from "@/use/localApi";
export default {
  props: {
    categories: Array as PropType<Array<Category>>,
  },
  emits: ["categorySelected"],
  setup(_: unknown, context: SetupContext) {
    const selectCategory = function(catName: string) {
      context.emit("categorySelected", catName);
      console.log(`Category ${catName} selected`);
    };
    return {
      selectCategory,
    };
  },
};
</script>
<style scoped>
.category-done-sidebar {
  font-size: 0.8rem;
  font-weight: lighter;
  padding-left: 20px;
}
.category-active-sidebar {
  font-size: 1rem;
  font-weight: bold;
  padding-left: 5px;
}
.sidebar {
  background-color: rgba(76, 0, 130, 0.853);
  border-radius: 5px;
  color: aliceblue;
  position: fixed;
  bottom: 70px;
  margin-left: 0;
  padding-left: 0;
  max-width: 75vw;
  z-index: 5000;
  overflow: auto;
  max-height: 70vh;
}

.sidebar-content {
  /* overflow: scroll; */
  text-align: left;
}
.category-done-sidebar {
  color: azure;
  font-size: 0.8rem;
  font-weight: lighter;
  padding-left: 20px;
}
.category-active-sidebar {
  color: azure;
  font-size: 1rem;
  font-weight: bold;
  padding-left: 5px;
}
</style>
