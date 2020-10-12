<template>
  <div class="p-1 m-2">
    <div class="card border todo-background">
      <div class="card-header text-left"> 
        <div class="row">
          <div class="col">
            <span class="category-title">{{ data.label }}</span>
          </div>
          <div class="col">
            <span class="float-right">
              <div class="btn-group">
                <button class="btn border" @click="deleteItem">
                  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
                <button class="btn border" @click="pullItem">
                  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-up-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path fill-rule="evenodd" d="M4.646 8.354a.5.5 0 0 0 .708 0L8 5.707l2.646 2.647a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708z" />
                    <path fill-rule="evenodd" d="M8 11.5a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5z" />
                  </svg>
                </button>
                <button class="btn border" @click="pushItem">
                  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-down-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path fill-rule="evenodd" d="M4.646 7.646a.5.5 0 0 1 .708 0L8 10.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z" />
                    <path fill-rule="evenodd" d="M8 4.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5z" />
                  </svg>
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div class="card-body text-left">
        <ul> 
          <li v-for="task in tasks" :key="task.label">{{task.label}}</li>
        </ul>
          <span class="float-right">
            <button class="btn border" @click="toggleShowAdd">
              <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-patch-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.273 2.513l-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8z"/>
              </svg>
          </button>
        </span>
        <div v-if="showAdd" class="input-group">
          <input type="text" ref="newTask"
            v-on:keyup.enter="addTask"
            placeholder="add new task">
          <button class="btn bg-secondary" @click="addTask">add</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { TodoTask, TodoItem } from "@/use/localApi";

import { LocalTodoItem, LocalTodoTask } from "@/use/todoUtil";

export default defineComponent({

  setup(props, context) {

    console.log("props:" + props.data);
    console.log("props.data:" + JSON.stringify(props));
    console.log("context.data:" + JSON.stringify(context));

    const showAdd = ref(true);

    const newTask: Ref<null | HTMLInputElement> = ref(null); // will be set by Vue

    const tasks: Ref<Array<TodoTask>> = ref(props.data.taskList);
    // props.data.tasks = ref([]); // Ref<Array<TodoTask>> = ref([]);
    // const tasks = props.data.tasks;


    const pullItem = function() {
      console.log("pull item ");
    }

    const pushItem = function() {
      console.log("push item ");
    }

    const deleteItem = function() {
      context.emit("clear-item", props.data.label);
    }

    const addTask = function() {
      if (newTask.value?.value) {
        const taskLabel = newTask.value!.value;
        console.log("taskLabel = " + taskLabel)
        const item = new LocalTodoTask(taskLabel);
      //  taskList); tasks.value.push(item);
        context.emit("data-change", props.data.label, taskLabel);
        // props.data.tasks.push(item);
      }
      showAdd.value = false;
    }

    const toggleShowAdd = () => {
      showAdd.value = !showAdd.value;
    }

    return {
      // refs (connection to input elements)
      newTask,
      // data
      tasks,
      showAdd,
      // methods
      pullItem,
      pushItem,
      addTask,
      deleteItem,
      toggleShowAdd
    }
  },

  components: {

  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },


});
</script>

<style scoped>
.todo-background {
  background-color: #ffddaa;
}
.category-title {
  text-transform: capitalize;
  font-size: 120%;
  font-weight: bold;
}
.category-done {
  background-color: papayawhip;
}
</style>