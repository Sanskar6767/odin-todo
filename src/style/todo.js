import { format } from "date-fns";

let taskIdCounter = 0;

export class TodoItem{
    constructor(title, desc, duedate, priority) {
        this.id = ++taskIdCounter;
        this.title = title;
        this.desc = desc;
        this.duedate = duedate;
        this.priority = priority;
        this.completed = false;
    }

    changeTitle(title) {
        this.title = title;
    }

    changeDesc(desc) {
        this.desc = desc;
    }

    changeDuedate(duedate) {
        this.duedate = duedate;
    }

    togglePriority() {
        this.priority = !this.priority;
        
    }

    getFormattedDueDate() {
        return format(this.duedate, 'PP'); //'Jan 1, 2024'
    }

    toggleCompletion() {
        this.completed = !this.completed;
    }

    setCompletion(status) {
        this.completed = status;
    }
    
} 