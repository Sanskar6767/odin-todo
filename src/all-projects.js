import { TodoItem } from "./style/todo";
import { Project } from "./project";
import './style/all-projects.css';
import clean from './assets/clean.svg';
import { navLinkActivate } from "./image";
import { openProject } from "./projectOpen";



export const allProjects = [];
function addingDemoProject() {
    const demoProject = new Project('Demo Project');
    demoProject.addTask(new TodoItem('Task 1', 'Description 1', new Date(), true));
    demoProject.addTask(new TodoItem('Task 2', 'Description 2', new Date(), false));
    allProjects.push(demoProject);
    addProjectInSidebar('Demo Project');
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
        openProject();
    }
    
})


function createAllProjectsPage() {
    createForm();
    addingDemoProject();
    showAllProjects(allProjects);
    addProjects();
    navLinkActivate();
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
            console.log(allProjects);
            addProjectInSidebar(projName);
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

function addProjectInSidebar(name) {
    const ul = document.querySelector('.projects');

    const li = document.createElement('li');
    
    const a = document.createElement('a');
    a.classList.add('nav-link');
    a.href = '#';
    // for eventlistener grouping with the list of all projects and thus matching a common class 
    a.classList.add('proj-a');
    a.setAttribute('data-project-name', name);

    const img = document.createElement('img');
    img.classList.add('sideicon')
    img.classList.add('demo');
    img.src = clean;
    img.alt = 'Project icon'

    const span = document.createElement('span');
    span.textContent = name;

    a.appendChild(img);
    a.appendChild(span);

    li.appendChild(a);

    ul.appendChild(li);
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

    allProjects.forEach(project => {
        const name = project.name;
        const li = document.createElement('li');
        li.classList.add('proj-li');

        const a = document.createElement('a');
        a.classList.add('proj-a');
        a.href = '#';
        a.setAttribute('data-project-name', project.name);

        const h4 = document.createElement('h4');
        h4.textContent = name;

        a.appendChild(h4);
        li.appendChild(a);
        ol.appendChild(li);
        
    });

    projectlist.appendChild(ol);
    wrapper.appendChild(heading);
    wrapper.appendChild(projectlist);
    section.appendChild(wrapper);

}
