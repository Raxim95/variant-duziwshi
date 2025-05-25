import db from "../db.js";
import showToast from "../show-toast.js";
import fill_tabs from "./fill_tabs.js";

const content_area = document.querySelector("#kategoriyalar .content");

// save
content_area.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault(); // Ctrl + s basılǵanda, brauzerdiń default funkciyasın toqtatamız
    if (db.cat_index === null) {
      showToast("Kategoriyanı tańlań!"); // Toast habarlamasın kórsetemiz
      return;
    }
    const lines = content_area.value.split("\n");
    db.kategoriyalar[db.cat_index].sorawlar = lines;
    showToast("Sorawlar saqlandı!"); // Toast habarlamasın kórsetemiz
  }
});

// new cat

const new_cat_input = document.querySelector("#new_cat_input");
const new_cat_btn = document.querySelector("#new_cat_btn");

new_cat_btn.addEventListener("click", add_category);
new_cat_input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") add_category();
});

// 94 453 11 92

export function show_category(index) {
  const content_area = document.querySelector("#kategoriyalar .content");
  const cat_title = document.querySelector("#cat_title");
  if (index === null) {
    content_area.value = "";
    cat_title.innerText = "";
    return;
  }
  content_area.value = db.kategoriyalar[index].sorawlar.join("\n");
  cat_title.innerText = db.kategoriyalar[index].name;
}

export function removeCategory(index) {
  db.kategoriyalar = db.kategoriyalar.filter((v, i) => index !== i);
  fill_tabs(db.kategoriyalar);
}
