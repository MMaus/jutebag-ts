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
              category.name
            }}</span>
          </div>
          <div class="col-4 p-0" v-if="showItems">
            <span class="float-right">
              <button class="btn border" @click="pullCategory">
                <svg
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 16 16"
                  class="bi bi-arrow-up-square"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M4.646 8.354a.5.5 0 0 0 .708 0L8 5.707l2.646 2.647a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 11.5a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5z"
                  />
                </svg>
              </button>
              <button class="btn border" @click="pushCategory">
                <svg
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                  class="bi bi-arrow-down-square"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M4.646 7.646a.5.5 0 0 1 .708 0L8 10.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 4.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
      <div class="card-body" v-if="showItems">
        <to-shop-item
          v-for="item in items"
          :key="item.id"
          :item="item"
          :categories="categorylist"
          @toggle-cart="logToggle"
        ></to-shop-item>
      </div>
    </div>
  </div>
</template>

<script>
import ToShopItem from "@/components/ToShopItem.vue";
import { Category } from "@/use/localApi";

const instance = {
  data: function() {
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
    toggleShowNevertheless: function() {
      if (!this.isDone) {
        this.showNevertheless = false; // debatable behaviour
        // deactivate toggling when not done
        return;
      }

      this.showNevertheless = !this.showNevertheless;
    },

    pullCategory: function() {
      this.$emit("pull-category", this.category.name);
    },
    pushCategory: function() {
      this.$emit("push-category", this.category.name);
    },
    logToggle: function(firstArg, secondArg) {
      console.log("logtoggle called");
      console.log("first arg:", firstArg);
      console.log("second arg:", secondArg);
    },
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
    },
  },

  watch: {
    // reset "showNevertheless" if category is not done, so that it always collapses when just being finished
    isDone: function(newIsDone, oldIsDone) {
      if (!newIsDone) {
        this.showNevertheless = false;
      }
    },
  },

  components: {
    "to-shop-item": ToShopItem,
  },
};

export default instance;
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
