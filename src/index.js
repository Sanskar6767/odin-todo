import './style/style.css';
import './style/header.css';
import './image.js';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; 



const checkbox = document.getElementById("checkbox")
if (checkbox.checked) {
  document.body.classList.add("dark");
}
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})


flatpickr("#yourInputFieldId", {
  enableTime: true,
  dateFormat: "Y-m-d",
  minDate: "today", // Disables past dates
});


