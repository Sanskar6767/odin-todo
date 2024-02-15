class TodoItem{
    constructor(title, desc, duedate, priority) {
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

    changePriority(priority) {
        this.priority = priority;
    }

    getFormattedDueDate() {
        return format(this.duedate, 'PP'); //'Jan 1, 2024'
    }

    toggleCompleteion() {
        this.completed = !this.completed;
    }
    
} 