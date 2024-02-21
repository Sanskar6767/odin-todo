import { allProjects } from "./all-projects";
import './style/projectOpen.css';
import { TodoItem } from "./style/todo";
import flatpickr from "flatpickr";

export function openProject() {
    const projects = document.querySelectorAll('.proj-a');
    projects.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const projectName = link.getAttribute('data-project-name');
        console.log(projectName);
        displayProjectDetails(projectName);
      })
    })
  }



function displayProjectDetails(projectName) {
    const project = allProjects.find(p => p.name === projectName);
    if (project) {
        const content = document.querySelector('.content');
        content.innerHTML= '';

        const proContainer = document.createElement('div');
        proContainer.classList.add('pro-container');

        const wrapperGrid = document.createElement('div');
        wrapperGrid.classList.add('wrapper-grid');

        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        const projTitleDiv = document.createElement('div');
        projTitleDiv.classList.add('proj-title-div');

        const h2 = document.createElement('h2');
        h2.textContent = project.name;
        h2.id = 'project-name'
        projTitleDiv.appendChild(h2);
        projectCard.appendChild(projTitleDiv);

        const projTasks = document.createElement('div');
        projTasks.classList.add('proj-tasks');

        // loop starts here 
        project.tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-div');
            taskDiv.setAttribute('data-task-id', task.id);

            const taskFlex = document.createElement('div');
            taskFlex.classList.add('task-flex');

            const input = document.createElement('input');
            input.type = "checkbox";
            input.name = "done";
            input.classList.add("done");
            input.setAttribute('data-task-id', task.id);
            input.checked = task.completed;

            const p = document.createElement('p');
            p.textContent = task.title ;
            if(task.completed) {
                p.style.textDecoration = "line-through";
            }

            const taskFlex1 = document.createElement('div')
            taskFlex1.classList.add('task-flex');

            const input1 = document.createElement('input');
            // input1.id = 'star1';
            input1.className = "star";
            input1.type = "checkbox";
            input1.title = "important";
            input1.checked = task.priority;
            input.setAttribute('data-task-id', task.id);

            const p1 = document.createElement('p');
            p1.textContent = task.getFormattedDueDate();

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-task');
            removeButton.setAttribute('type', 'button');
            removeButton.textContent = 'Remove';

            const editButton = document.createElement('button');
            editButton.classList.add('edit-task');
            editButton.setAttribute('type', 'button');
            editButton.textContent = 'Edit';

            taskFlex.appendChild(input);
            taskFlex.appendChild(p);
            taskFlex1.appendChild(input1);
            taskFlex1.appendChild(p1);
            taskFlex1.appendChild(editButton);
            taskFlex1.appendChild(removeButton);

            taskDiv.appendChild(taskFlex);
            taskDiv.appendChild(taskFlex1);

            projTasks.appendChild(taskDiv);
        })

        const flex = document.createElement('div');
        flex.classList.add('flex');

        const button = document.createElement('button');
        button.classList.add('addtask-button');
        button.textContent = 'Add a task';

        flex.appendChild(button);

        projectCard.appendChild(projTasks);
        wrapperGrid.appendChild(projectCard);
        proContainer.appendChild(wrapperGrid);
        proContainer.appendChild(flex);

        content.appendChild(proContainer);

        // adding features to each task 
        projTasks.addEventListener('click', function(event) {
        
            const taskId = event.target.closest('.task-div').getAttribute('data-task-id');
            const task = project.tasks.find(t => t.id.toString() === taskId);
    
            if (task) {
                if (event.target.classList.contains('edit-task')) {
                    console.log('Edit Task', task);
                    createEditTaskForm(projectName, taskId);
                    // Here you would implement the logic to edit the task
                } else if (event.target.classList.contains('remove-task')) {
                    console.log('Remove Task', task);
                    const intTaskId = parseInt(taskId);
                    const findIndex = project.tasks.findIndex(task => task.id === intTaskId);
                    if (findIndex !== -1) {
                        // project.tasks.splice(findIndex, 1);
                        project.removeTask(findIndex)
                        displayProjectDetails(projectName); // Refresh the project details to show the updated task list
                    }

                } else if (event.target.type === 'checkbox' && event.target.classList.contains('star')) {
                    // Toggle task priority
                    task.togglePriority();
                    displayProjectDetails(projectName);

                } else if (event.target.type === 'checkbox' && event.target.classList.contains('done')) {
                    task.toggleCompletion();
                    console.log(task.completed);
                    displayProjectDetails(projectName);
                }
            }
        
        });








        makeTaskForm(projectName);

    }
}



function createEditTaskForm(projectName, taskId) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // intercept testing 
    const editFormWrapper = document.createElement('div');
    editFormWrapper.classList.add('edit-form-wrapper')

    const editForm = document.createElement('form');
    editForm.id = 'edit-task-form';
    editForm.classList.add('edit-task-form');

    const titleInput = document.createElement('input');
    titleInput.id = 'edit-title';
    titleInput.name = 'edit-title';
    titleInput.type = 'text';
    titleInput.placeholder = 'Change the title';

    const descTextarea = document.createElement('textarea');
    descTextarea.id = 'edit-desc';
    descTextarea.name = 'edit-desc';
    descTextarea.placeholder = 'Change the description';

    const deadlineInput = document.createElement('input');
    deadlineInput.id = 'edit-deadline';
    deadlineInput.name = 'edit-deadline';
    deadlineInput.type = 'text'; // Flatpickr will turn this into a date picker
    deadlineInput.placeholder = 'Change the deadline';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Update Task';
    submitButton.classList.add('edit-task-submit');

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('edit-task-cancel');
    cancelButton.onclick = () => overlay.remove(); // Close the form

    // Append elements to the form
    editForm.appendChild(titleInput);
    editForm.appendChild(descTextarea);
    editForm.appendChild(deadlineInput);
    editForm.appendChild(submitButton);
    editForm.appendChild(cancelButton);

    // Append the form to the overlay, then overlay to the body
    editFormWrapper.appendChild(editForm);
    overlay.appendChild(editFormWrapper);
    document.body.appendChild(overlay);

    // Initialize Flatpickr for the deadline input
    flatpickr("#edit-deadline", {
        dateFormat: "Y-m-d",
        minDate: "today",
    });

    // Pre-fill form with task data if needed
    // Correctly find the project object using the projectName
    const project = allProjects.find(p => p.name === projectName);
    if (project) {
        // Now that we have the correct project object, find the task
        const task = project.tasks.find(t => t.id.toString() === taskId);
        if (task) {
            // Pre-fill the form with the task's current values
            titleInput.value = task.title;
            descTextarea.value = task.desc || '';
            deadlineInput.value = task.duedate; // Make sure this is formatted correctly for the input
        }
    }


    // Handle form submission
    editForm.onsubmit = (e) => {
        e.preventDefault();
        // Perform update logic here
        console.log('Updating task:', taskId);
        const task = project.tasks.find(t => t.id.toString() === taskId);

        if (titleInput.value.length > 4 && titleInput.value.length < 28 ) {
            task.changeTitle(titleInput.value);
        } else {
            alert('Title length should be between 4-28 characters');
            return;
        }

        if (descTextarea.value) {
            task.changeDesc(descTextarea.value);
        }

        if (deadlineInput.value) {
            task.changeDuedate(deadlineInput.value);
        }
        console.log(task);
        displayProjectDetails(project.name);
        overlay.remove(); // Close the form after updating
    };
}


function makeTaskForm(projectName) {
    
    const content = document.querySelector('.content');

    const section = document.createElement('section');
    section.classList.add('task-container');

    const taskAddDiv = document.createElement('div');
    taskAddDiv.classList.add('task-add-div')
    
    const form = document.createElement('form');
    form.id = 'add-task-form';

    const formGroup1 = document.createElement('div');
    formGroup1.classList.add('form-group');

    const ltaskname = document.createElement('label');
    ltaskname.textContent = 'Task Name* :'
    ltaskname.setAttribute('for', 'task-name');

    const tinput = document.createElement('input');
    tinput.setAttribute('type', 'text');
    tinput.id ='task-name';
    tinput.setAttribute('name' ,'task-name');
    tinput.required = true;

    formGroup1.appendChild(ltaskname);
    formGroup1.appendChild(tinput);

    const formGroup2 = document.createElement('div');
    formGroup2.classList.add('form-group');

    const taskdesc = document.createElement('label');
    taskdesc.textContent = 'Task Description (Optional) :';
    taskdesc.setAttribute('for', 'task-desc');

    const textarea = document.createElement('textarea');
    textarea.id = 'task-desc';
    textarea.setAttribute('name', 'task-desc');


    formGroup2.appendChild(taskdesc);
    formGroup2.appendChild(textarea);

    const formGroup3 = document.createElement('div');
    formGroup3.classList.add('form-group');

    const taskDeadline = document.createElement('label');
    taskDeadline.textContent = 'Deadline:';
    taskDeadline.setAttribute('for', 'task-deadline');

    const idate = document.createElement('input');
    idate.id = 'task-deadline';
    idate.setAttribute('name', 'task-deadline');
    idate.setAttribute('type', 'date');


    formGroup3.appendChild(taskDeadline);
    formGroup3.appendChild(idate);

    const formGroup4 = document.createElement('div');
    formGroup4.classList.add('form-group');

    const taskImp = document.createElement('label');
    taskImp.textContent = 'Priority:';
    taskImp.setAttribute('for', 'task-important');

    const ipriority = document.createElement('input');
    ipriority.id = 'task-priority';
    ipriority.classList.add('star');
    ipriority.setAttribute('name', 'task-priority');
    ipriority.setAttribute('type', 'checkbox');


    formGroup4.appendChild(taskImp);
    formGroup4.appendChild(ipriority);

    const formButton = document.createElement('div');
    formButton.classList.add('form-buttons');

    const button1 = document.createElement('button');
    button1.setAttribute('type', 'submit');
    button1.textContent = 'Add Task';
    button1.id = 'submit-button';

    const button2 = document.createElement('button');
    button2.setAttribute('type', 'button');
    button2.textContent = 'Cancel';
    button2.id = 'cancel-button';

    formButton.appendChild(button1);
    formButton.appendChild(button2);

    form.appendChild(formGroup1);
    form.appendChild(formGroup2);
    form.appendChild(formGroup3);
    form.appendChild(formGroup4);
    form.appendChild(formButton);

    taskAddDiv.appendChild(form);
    section.appendChild(taskAddDiv);
    content.appendChild(section);

    flatpickr("#task-deadline", {
        dateFormat: "Y-m-d",
        minDate: "today", // Disables past dates
      });

    // adding event listeners 
    const addtaskButton = document.querySelector('.addtask-button');
    addtaskButton.addEventListener('click', () => {
        section.style.display = 'block';
    })


    button2.addEventListener('click', function(event) {
        event.preventDefault();
        form.reset();
        section.style.display = 'none';
    });
        
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = tinput.value;
        if (name.length< 4 || name.length >28){
            alert('Task name should be with 4-28 characters');
            return
        }
        let description = 'No description mentioned'
        if (textarea.value){
            description = textarea.value;
        }
        const deadline = document.getElementById('task-deadline').value;
        if (!deadline) {
            alert('Deadlines or duedates are necessary');
            return;
        }

        const isPriority = document.getElementById('task-priority').checked;
        let priority = false;
        if (isPriority){
            priority = true;
        }

        const task = new TodoItem(name, description, deadline, priority);
        const project = allProjects.find(p => p.name === projectName);
        project.addTask(task);
        displayProjectDetails(projectName);

    }); 
    
}