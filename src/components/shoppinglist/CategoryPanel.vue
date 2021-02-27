<template>
  <div
    class="col-md-6 col-xl-4 p-1 m-0"
    :class="{ 'col-4 greenish': !showItems, 'col-12': showItems }"
  >
    <div class="card">
      <div
        class="card-header text-left"
        v-bind:class="{ 'text-success': isDone, 'category-done': isDone }"
        @click="toggleShowNevertheless"
      >
        <div class="row">
          <div :class="{ 'col-8': showItems, 'col-12': !showItems }">
            <span class="category-title" :class="{ smallTitle: !showItems }">{{
              category.catName
            }}</span>
          </div>
          <category-mover
            v-if="showItems"
            v-on="{ pullCategory, pushCategory }"
          />
        </div>
      </div>
      <div class="card-body" v-if="showItems">
        <shopping-item-display
          v-for="item in category.items"
          :key="item.id"
          :item="item"
          :categories="categorylist"
          @toggle-cart="logToggle"
        ></shopping-item-display>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ShoppingItemDisplay from "./ShoppingItemDisplay.vue";
import { defineComponent, PropType } from "vue";
import { Emitter, Handler } from "mitt";
import CategoryMover from "./CategoryMover.vue";
import { Category } from "@/store/shopping/types";

// note: defineComponent is required because of the use of TypeScript (not kidding!)
export default defineComponent({
  data() {
    return {
      showNevertheless: false,
    };
  },

  props: {
    category: {
      type: Object as PropType<Category>,
      required: true,
    },
    categorylist: {
      type: Array, // as PropType<Array<String>>,
      required: true,
    },
    mitt: {
      type: Object as PropType<Emitter>,
      required: true,
    },
  },

  created: function() {
    this.mitt.on("do-open", this.doOpen as Handler);
  },

  methods: {
    toggleShowNevertheless: function(): void {
      if (!this.isDone) {
        this.showNevertheless = false; // debatable behaviour
        // deactivate toggling when not done
        return;
      }

      this.showNevertheless = !this.showNevertheless;
    },
    doOpen: function(catName: string): void {
      if (this.category.catName === catName) {
        this.showNevertheless = true;
      }
    },

    // FIXME: introduce consistent event naming scheme, either kebap-case or CamelCase
    pullCategory: function() {
      console.log("PULLING BABY");
      this.$emit("pull-category", this.category.catName);
    },
    pushCategory: function() {
      console.log("PUSH IT TO THE LIMIT BABY");
      this.$emit("push-category", this.category.catName);
    },

    logToggle: function(firstArg: any, secondArg: any) {
      console.log("logtoggle called");
      console.log("first arg:", firstArg);
      console.log("second arg:", secondArg);
    },
  },

  computed: {
    isDone(): boolean {
      return this.category.isDone;
    },
    showItems(): boolean {
      return !this.isDone || this.showNevertheless;
    },
  },

  watch: {
    // reset "showNevertheless" if category is not done, so that it always collapses when just being finished
    isDone: function(newIsDone: boolean) {
      if (!newIsDone) {
        this.showNevertheless = false;
      }
    },
  },

  components: {
    ShoppingItemDisplay,
    CategoryMover,
  },
});
</script>

<style scoped>
.category-title {
  text-transform: capitalize;
  font-size: 1.2rem;
  font-weight: bold;
}
.smallTitle {
  font-size: 0.82rem;
  font-weight: normal;
  padding: 0;
  overflow: hidden;
}
.greenish {
  background-color: rgba(45, 189, 129, 0.616);
}
.category-done {
  background-color: papayawhip;
  padding: 1rem; /* FIXME: 0rem leads to overflow!! fix item hierarchy */
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  /* padding: 0.4rem; */
}
</style>