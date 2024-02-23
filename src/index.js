import './style/style.css';
import './style/header.css';
import './image.js';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; 
import './all-projects.js';
import './projectOpen.js';
import { clearLocalStorage } from './image.js';

// temp to be removed 
const localbutton = document.querySelector('.local-storage');
localbutton.addEventListener('click', () => {
  clearLocalStorage();
})

const checkbox = document.getElementById("checkbox")
if (checkbox.checked) {
  document.body.classList.add("dark");
}
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})


flatpickr("#task-deadline", {
  dateFormat: "Y-m-d",
  minDate: "today", // Disables past dates
});



