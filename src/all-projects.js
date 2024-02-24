import { TodoItem } from "./todo";
import { Project } from "./project";
import './style/all-projects.css';
import clean from './assets/clean.svg';
import { navLinkActivate } from "./image";
import { openProject } from "./projectOpen";
import { differenceInBusinessDays } from "date-fns";

// functions to use localStorage effectively 

export function saveProjectsToLocalStorage() {
    localStorage.setItem('allProjects', JSON.stringify(allProjects));
}

export function loadProjectsFromLocalStorage() {
    const savedProjects = localStorage.getItem('allProjects');
    if (!savedProjects) return [];

    const projectsData = JSON.parse(savedProjects);
    const projects = projectsData.map(projData => {
        const project = new Project(projData.name);
        projData.tasks.forEach(taskData => {
            const task = new TodoItem(taskData.title, taskData.desc, new Date(taskData.duedate), taskData.priority);
            task.setCompletion(taskData.completed || false); 
            project.addTask(task);
        });
        return project;
    });
    return projects;
}


export let allProjects = loadProjectsFromLocalStorage();

// export let allProjects = [];


function addingDemoProject() {
    // Check if 'Demo Project' already exists
    const demoExists = allProjects.some(project => project.name === 'Demo Project');
    if (!demoExists) {
        const demoProject = new Project('Demo Project');
        demoProject.addTask(new TodoItem('Task 1', 'Description 1', new Date(), true));
        demoProject.addTask(new TodoItem('Task 2', 'Description 2', new Date(), false));
        allProjects.push(demoProject);
        addProjectInSidebar('Demo Project');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createAllProjectsPage();
});



const allProjectsSidebar = document.querySelector('.all-pro');
allProjectsSidebar.addEventListener('click', () => {
    if (allProjectsSidebar.className !== 'active') {
        const content = document.querySelector('.content');
        content.innerHTML = '';
        
        createForm();
        addProjects();
        showAllProjects(allProjects);
        removeProjects();
        openProject();
    }
    
})


function createAllProjectsPage() {
    loadProjectsFromLocalStorage();
    // saveProjectsToLocalStorage();
    createForm();
    addingDemoProject();
    showAllProjects(allProjects);
    addProjectInSidebar();
    addProjects();
    navLinkActivate();
    removeProjects();
    openProject();
}

function addProjects () {
    const newProjButton = document.querySelector('#new-proj-button');
    if (!newProjButton) {
        return;
    }
    newProjButton.addEventListener('click', (event) =>{
        event.preventDefault();
        const projName = document.querySelector('[name="Project-name"]').value;
        if( projName.length< 3 || projName.length > 18) {
            alert('Project Name should be between 4-18 characters');
            return;
        }
        const exists = allProjects.some(project => project.name === projName);
        if (!exists) {
            allProjects.push(new Project(projName));
            saveProjectsToLocalStorage();
            loadProjectsFromLocalStorage();
            console.log(allProjects);
            addProjectInSidebar();
            removeProjects();
            showAllProjects(allProjects);
            navLinkActivate();
            openProject();
        } else {
            alert("Project with this name already exists.");
        }
    });
}







// Dom manipulation down here 

function createForm() {
    const content = document.querySelector('.content');

    const containerDiv = document.createElement('div');
    containerDiv.className = 'new-project'

    const form = document.createElement('form');
    form.id = 'myForm';

    const inputDiv = document.createElement('div');
    inputDiv.className = 'new-proj-form';

    const input = document.createElement('input');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autofocus', '');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'Project-name');
    input.setAttribute('placeholder', 'Name');
    input.required = true;

    inputDiv.appendChild(input);

    const buttonDiv = document.createElement('div');

    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.id= 'new-proj-button';
    button.textContent = 'Add New Project';

    buttonDiv.appendChild(button);

    form.appendChild(inputDiv);
    form.appendChild(buttonDiv);

    containerDiv.appendChild(form);

    // making a section for the list to use in showAllProjects function 

    const section = document.createElement('section');
    section.classList.add('projects-section');

    content.appendChild(containerDiv); // Adjust this as needed
    content.appendChild(section);

}

function addProjectInSidebar() {
    loadProjectsFromLocalStorage();

    const ul = document.querySelector('.projects');

    const lis = ul.querySelectorAll("li:not(:first-child)");

    // Remove each li element except the first one
    for (const li of lis) {
        li.parentNode.removeChild(li);
    }
    

    allProjects.forEach(project => {
        const ul = document.querySelector('.projects');

        const li = document.createElement('li');
        li.classList.add('project-name-sidebar');
        
        const a = document.createElement('a');
        a.classList.add('nav-link');
        a.href = '#';
        // for eventlistener grouping with the list of all projects and thus matching a common class 
        a.classList.add('proj-a');
        a.setAttribute('data-project-name', project.name);

        const img = document.createElement('img');
        img.classList.add('sideicon')
        img.classList.add('demo');
        img.src = clean;
        img.alt = 'Project icon'

        const span = document.createElement('span');
        span.textContent = project.name;

        a.appendChild(img);
        a.appendChild(span);

        li.appendChild(a);

        ul.appendChild(li);
    }) 
}

function showAllProjects(allProjects) {

    const section = document.querySelector('section');
    section.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper-projectlist');

    const heading = document.createElement('div');
    heading.classList.add('heading-projectlist');

    const h2 = document.createElement('h2');
    h2.textContent = 'ALL PROJECTS';

    heading.appendChild(h2);

    const projectlist = document.createElement('div');
    projectlist.classList.add('projectlist');

    const ol = document.createElement('ol');

    if (allProjects.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No projects to display.';
        emptyMessage.classList.add('empty-projects-message'); // Optionally style this message
        projectlist.appendChild(emptyMessage);
    
    } else {
        allProjects.forEach(project => {
            const name = project.name;
            const li = document.createElement('li');
            li.classList.add('proj-li');

            const divFlex = document.createElement('div');
            divFlex.classList.add('flex-projects-div');

            const a = document.createElement('a');
            a.classList.add('proj-a');
            a.href = '#';
            a.setAttribute('data-project-name', project.name);

            const button = document.createElement('button');
            button.classList.add('remove-project');
            button.textContent = 'Remove';
            button.setAttribute('project-name', project.name);

            const h4 = document.createElement('h4');
            h4.textContent = name;

            a.appendChild(h4);
            divFlex.appendChild(a);
            divFlex.appendChild(button);
            li.appendChild(divFlex);
            ol.appendChild(li);
        
        });
    }

    projectlist.appendChild(ol);
    wrapper.appendChild(heading);
    wrapper.appendChild(projectlist);
    section.appendChild(wrapper);

}

function removeProjects() {
    const section = document.querySelector('section'); // Assuming this is a stable parent that doesn’t get replaced
    section.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('remove-project')) {
            e.stopPropagation();
            loadProjectsFromLocalStorage();
            const projectNameRemove = target.getAttribute('project-name');
            const projectIndex = allProjects.findIndex(p => p.name === projectNameRemove);
            if (projectIndex > -1) {
                allProjects.splice(projectIndex, 1);
                saveProjectsToLocalStorage();
                showAllProjects(allProjects);
                addProjectInSidebar();
            }
        }
    });
}


