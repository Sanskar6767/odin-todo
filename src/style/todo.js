import { format } from "date-fns";

export class TodoItem{
    constructor(title, desc, duedate, priority) {
        this.title = title;
        this.desc = desc;
        this.duedate = duedate;
        this.priority = false;
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

    togglePriority(priority) {
        this.priority = !this.priority;
    }

    getFormattedDueDate() {
        return format(this.duedate, 'PP'); //'Jan 1, 2024'
    }

    toggleCompleteion() {
        this.completed = !this.completed;
    }
    
} 