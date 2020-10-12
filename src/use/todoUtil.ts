
import { ref, Ref } from "vue";
import { TodoItem, TodoTask, TaskStatus} from "@/use/localApi";

/**
 * "Local" refers to the view model
 */
class LocalTodoItem implements TodoItem {

    constructor(label: string) {
        this.label = label;
    }

    label: string;
    taskList = [];
    nextActionTime = new Date();

}

/**
 * "Local" refers to the view model
 */
class LocalTodoTask implements TodoTask {

    constructor(label: string) {
        this.label = label;
    }

    label: string;

    status = TaskStatus.TODO;

}

class TodoDAO {
    
    // apparently you must not use this directly...
    private todoItems: Array<TodoItem> = [];

    readonly todoItemsRef: Ref<Array<TodoItem>> = ref(this.todoItems);

    private storeName: string;

    constructor(storeName: string) {
        this.storeName = "jutebag." + storeName;
        this.loadLocally();
    }

    createTodo(label: string) {
        this.todoItemsRef.value.push(new LocalTodoItem(label));
        this.storeLocally();
    }

    getItem(todoId: string): TodoItem|undefined {
        const item = this.todoItemsRef.value.find(item => item.label === todoId);
        return item;
    }

    /**
     * Write the data to local storage
     */
    storeLocally() {
        console.log("storing locally...");
        let stringified = JSON.stringify(this.todoItems);
        console.log("Stringified todoItems:" + stringified);
        stringified = JSON.stringify(this.todoItemsRef.value);
        console.log("Stringified todoItems (from ref):" + stringified);
        localStorage.setItem(this.storeName, stringified);
        console.log("Stored todo items to localStorage");
    }

    /**
     * Read the data from local storage
     */
    loadLocally() {
        try {
            const storedContent = localStorage.getItem(this.storeName);
            if (storedContent) {
                const parsedContent = JSON.parse(storedContent);
                if (Array.isArray(parsedContent)) {
                    this.todoItemsRef.value = parsedContent;
                }

            } else {
                console.warn("No local todo item store found.");
            }
        } catch(error) {
            console.log("ERROR during initialization of todo list data" + error);
        }
    }

}


export {
    LocalTodoItem,
    LocalTodoTask,
    TodoDAO
}