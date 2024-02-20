import { allProjects } from "./all-projects";
import './style/projectOpen.css';
import { TodoItem } from "./style/todo";

export function openProject() {
    const projects = document.querySelectorAll('.proj-a');
    projects.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const projectName = link.getAttribute('data-project-name');
        console.log(projectName);
        displayProjectDetails(projectName);
        makeTaskForm();
        formVisible();
      })
    })
  }


function formVisible() {
    const addtaskButton = document.querySelector('.addtask-button');
    const section = document.querySelector('.task-container');
    addtaskButton.addEventListener('click', () => {
        section.style.display = 'block';
    })
    const cancelButton = document.querySelector('#cancel-button');
    cancelButton.addEventListener('click', () => {
        section.style.display = 'none';
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
        projTitleDiv.appendChild(h2);
        projectCard.appendChild(projTitleDiv);

        const projTasks = document.createElement('div');
        projTasks.classList.add('proj-tasks');

        // loop starts here 
        project.tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-div');

            const taskFlex = document.createElement('div');
            taskFlex.classList.add('task-flex');

            const input = document.createElement('input');
            input.type = "checkbox";
            input.name = "done";
            input.id = "done" ;

            const p = document.createElement('p');
            p.textContent = task.title ;

            const taskFlex1 = document.createElement('div')
            taskFlex1.classList.add('task-flex');

            const input1 = document.createElement('input');
            input1.id = 'star1';
            input1.className = "star";
            input1.type = "checkbox";
            input1.title = "important";

            const p1 = document.createElement('p');
            p1.textContent = task.getFormattedDueDate();

            taskFlex.appendChild(input);
            taskFlex.appendChild(p);
            taskFlex1.appendChild(input1);
            taskFlex1.appendChild(p1);

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

    }
}

function makeTaskForm() {
    // const addtaskButton = document.querySelector('.addtask-button');
    // addtaskButton.addEventListener('click', () => {

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
    taskdesc.textContent = 'Task Description (Options) :'
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
        
    
}