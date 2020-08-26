<template>
  <div id="todoComp">
    <div class="jumbotron bg-warning">
      <span class="p-2 bg-danger">Warning</span> This component does not yet feature persistence!
      </div>
    <div class="d-sm-flex flex-wrap border">
        <todo-item v-for="todo in todoItems" :key="todo" :label="todo" />
    </div>
    <div class="p-2 fixed-bottom text-right float-right bg-secondary text-white">
      <button class="btn bg-primary text-white" @click="openModal">
                      <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-patch-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.273 2.513l-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8z"/>
              </svg>
        </button>
    </div>

    <add-todo-modal v-if="showModal" @close="onNewItem">
  
    </add-todo-modal>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoItem from "@/components/TodoItem.vue";
import AddTodoModal from "@/components/AddTodoModal.vue";

export default defineComponent({
  data: function () {
    return {
      todoItems: ["one", "two", "three"],
      showModal: false,
    };
  },

  methods: {
    openModal: function() {
      console.log("opening modal dialog");
      this.showModal = true;
    },
    onNewItem: function(newItem: string) {
      if (newItem) {
        this.todoItems.push(newItem);
      }
      this.showModal = false;

    }
  },

  components: {
    "add-todo-modal" : AddTodoModal,
    "todo-item": TodoItem,
  },
});
</script>

<style>
#todoComp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
