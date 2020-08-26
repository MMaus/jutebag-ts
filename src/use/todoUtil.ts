
import { ref } from "vue";
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

export {
    LocalTodoItem,
    LocalTodoTask
}