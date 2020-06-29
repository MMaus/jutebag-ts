<template>
  <div>
    <div
      v-if="item.stored"
      class="storedItem mt-1 text-success text-left font-weight-bold"
      v-on:click="onClickHandler"
    >{{item.qty}}x {{item.name}}</div>

    <div v-else class="card bg-secondary m-1 itemsized">
      <div class="card-head text-white font-italic small">Qty: {{item.qty}}, DEBUG:ID={{item.id}}</div>
      <div class="card-body p-1 font-weight-bold text-light">
        <div class="row">
          <div class="col-auto">
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary" v-on:click="decreaseQty">-</button>
              <button type="button" class="btn btn-outline-primary bg-white">
                <b>{{item.qty}}</b>
              </button>
              <button type="button" class="btn btn-primary" v-on:click="increaseQty">+</button>
            </div>
          </div>
          <div class="col text-left my-auto" v-on:click="onClickHandler">{{ item.name }}</div>
          <div class="col-auto" aria-label="change quantity">
            <button type="button" class="btn btn-warning" v-on:click="toggleCollapse()">
              <span class="nav-item dropdown-toggle"></span>
            </button>
          </div>
        </div>
        <div class="w-100"></div>
        <div class="collapse pt-2" v-bind:class="{'show' : showOptions}">
          <button
            class="btn btn-danger text-white font-weight-bold mr-3"
            v-on:click="notifyDelete()"
          >x</button>
          <select id="category" ref="category"
              @change="changeCategory($event)">
            <option
              v-for="cat in categories"
              :key="cat.name"
              :value="cat.name"
              :selected="cat.name === item.category"
            >{{cat.name}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      showOptions: false
    };
  },
  methods: {
    toggleCollapse: function() {
      this.showOptions = !this.showOptions;
    },
    notifyDelete: function() {
      this.emitChained("delete-item", this.item.id);
      console.log("Deleting " + this.item.name);
    },
    increaseQty: function() {
      const copy = {};
      Object.assign(copy, this.item);
      copy.qty = this.item.qty + 1;
      this.emitChained("update-qty", copy);
      console.log("Notifying cart toggle " + this.item.name);
    },
    emitChained: function(eventName, eventData) {
      this.$emit(eventName, eventData);
      let vm = this.$parent;
      while (vm) {
        vm.$emit(eventName, eventData);
        vm = vm.$parent;
      }
    },
    changeCategory : function(event) {
      const copy = {};
      Object.assign(copy, this.item);
      copy.category = event.target.value;
      this.emitChained("update-category", copy);
      console.log("Category of " + this.item.name + " changed to " + event.target.value);
    },
    decreaseQty: function() {
      const copy = {};
      Object.assign(copy, this.item);
      copy.qty = this.item.qty - 1;
      this.emitChained("update-qty", copy);
      console.log("Notifying cart toggle " + this.item.name);
    },

    onClickHandler: function() {
      this.emitChained("toggle-cart", this.item);
      console.log("event emitted");
      // console.log("item qty = " + this.item.qty);
      // this.item.qty = this.item.qty + 1;
      // console.log("item qty now = " + this.item.qty);
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>
<style scoped>
.itemsized {
  min-width: 20rem;
}
.stored-item {
  background-color: palegoldenrod;
}
</style>
