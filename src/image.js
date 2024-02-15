import logo from './assets/logo.png';
import target from './assets/bullseye-arrow.svg';
import todo from './assets/to-do.svg';
import calendar from './assets/calendar-days.svg';
import all from './assets/border-all.svg';
import clean from './assets/clean.svg';

document.addEventListener('DOMContentLoaded', () => {
    const logoImage = document.querySelector('.logo');
    if (logoImage) logoImage.src = logo;
    const targetImg = document.querySelector('.target');
    if (targetImg) targetImg.src = target;
    const todoImg = document.querySelector('.todo');
    if (todoImg) todoImg.src = todo;
    const allImg = document.querySelector('.all');
    if (allImg) allImg.src = all;
    const demoImg = document.querySelector('.demo');
    if (demoImg) demoImg.src = clean;
    const calendarImg = document.querySelector('.calendar');
    if (calendarImg) calendarImg.src = calendar;
    
})





// sidebar
const navBar = document.querySelector("nav")
const toggleNavBtn = document.querySelector("#toggle-nav-btn")

toggleNavBtn.addEventListener("click", (event) => {
  toggleNav()
})

function toggleNav() {
  if (navBar.classList.contains("nav-min")){
    openNav()
  } else {
    closeNav()
  }
}

function openNav() {
  navBar.classList.remove("nav-min") 
  navBar.classList.add("nav-max") 
}

function closeNav() {
  navBar.classList.remove("nav-max") 
  navBar.classList.add("nav-min")
}


// Medias
const phone = window.matchMedia("(width <= 480px)")

function media(e) {
  if (e.matches) {
    closeNav()
  } else {
    openNav()
  }
}

phone.addListener(media)