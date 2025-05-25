import fill_tabs from "./funcs/categoy/fill_tabs.js";
import db from "./funcs/db.js";

fill_tabs(db.kategoriyalar);

for (const element of document.querySelectorAll("#menu .tabs button")) {
  element.addEventListener("click", event);
}

function event(e) {
  show(e.target.innerText);
  for (const element of document.querySelectorAll("#menu .tabs button")) element.classList.remove("font-bold");

  e.target.classList.toggle("font-bold", true);
}

function show(name) {
  for (const element of document.querySelector("#main").children) {
    if (element.id === name) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  }
}
