class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        if (task instanceof TodoItem) {
            this.tasks.push(task);
        } else {
            console.error('Invalid task');
        }
    }

    removeTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
    }

    getTaks() {
        return this.tasks;
    }
}