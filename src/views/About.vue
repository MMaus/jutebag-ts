<template>
  <div>
    <div class="jumbotron">
      <h1>About JuteBag</h1>
      <p class="lead">
        JuteBag is a shopping list application. Developed as a toy project, I
        intend to explore as many technologies as possible while at the same
        time creating some useful application.
      </p>
      <p>
        Despite being a toy project, it aims for usability as well. However, it
        is not intended for production yet, that is, data loss may occur at any
        time, especially due to incompatible updates. That's not a bug, just
        expected behaviour.
      </p>
    </div>
    <!-- <div class="row">
      <div class="col-4 bg-primary">
        <button class="btn button" @click="toggleDiv">Toggle</button>
      </div>
      <transition name="t1">
        <div class="col-4 bg-warning" v-if="showDiv">
          <div class="bg-dark text-white">Hello</div>
        </div>
      </transition>
      <div class="col-4 bg-primary p-5">
        <transition name="t2" mode="out-in">
          <button @click="showUsers" v-if="!isUsersVisible">Show users</button>
          <button @click="hideUsers" v-else>Hide users</button>
        </transition>
      </div>
    </div>
    <transition-group tag="ul" name="t2">
      <li v-for="elem in listItems" :key="elem" @click="removeItem(elem)">
        {{ elem }}
      </li>
    </transition-group>
    <input type="text" id="foo" v-model="newItem" placeholder="add some item" />
    <button @click="addItem" class="btn btn-primary button">Add item</button> -->
  </div>
</template>

<script lang="ts">
// import { ref, reactive } from "vue";
export default {
  setup() {
    // const listItems = reactive(["a", "b", "c", "d", "e"]);
    // const showDiv = ref(true);
    // const newItem = ref("");
    // const isUsersVisible = ref(false);

    // const showUsers = function() {
    //   isUsersVisible.value = true;
    // };
    // const hideUsers = function() {
    //   isUsersVisible.value = false;
    // };
    // const toggleDiv = function() {
    //   showDiv.value = !showDiv.value;
    //   console.log("visibility toggled");
    // };

    // const addItem = function() {
    //   console.log(`adding new item: ${newItem}`);
    //   listItems.push(newItem.value);
    // };

    // const removeItem = function(item: string) {
    //   console.log(`removing item ${item}`);
    //   const index = listItems.findIndex((it) => it === item);
    //   listItems.splice(index, 1);
    // };

    return {
      // showDiv,
      // toggleDiv,
      // isUsersVisible,
      // showUsers,
      // hideUsers,
      // listItems,
      // newItem,
      // addItem,
      // removeItem,
    };
  },
};
</script>
<style scoped>
/* li {
  text-align: center;
  border: 1px solid salmon;
  background-color: gainsboro;
  padding: 1rem;
  margin: 0.1rem;
}

.t1-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.5);
}

.t1-enter-active {
  transition: all 5s ease-out;
}

.t1-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.t1-leave-from {
  background-color: red;
}

.t1-leave-to {
  opacity: 0.5;
  transform: translateX(-100px) scale(0.2) rotate(180deg);
}

.t1-leave-active {
  transition: all 5s ease-in;
}

.t2-enter-from,
.t2-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.5);
}

.t2-enter-to,
.t2-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.t2-enter-active {
  transition: all 0.8s ease-out;
} */

/* .t2-leave-active {
  transition: all 0.9s ease-in-out;
  position: absolute; /* to enable smooth list changes */
/* } */

/* for transition-group only! */
/* .t2-move {
  transition: transform 0.8s ease;
} */
</style>
