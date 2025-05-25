import { show_category, removeCategory } from "./kategoriya.js";
import db from "../db.js";

// id="kategoriya" bolǵan elementti toltıramız
export default function fill_tabs(kategoriyalar = []) {
  const tabs = document.querySelector("#kategoriyalar .tabs");

  if (kategoriyalar.length === 0) return;
  tabs.innerText = ""; // tabsqa barlıq elementterdi óchirip qoyamız

  kategoriyalar.forEach((v, i) => {
    // knopkalar turatuǵın div
    const div = document.createElement("div");
    div.className = "flex gap-2";

    // tabsqa button (kategoriya) qosamız
    const btn = document.createElement("button");
    btn.innerText = v.name;
    btn.className = "grow border-b-1 text-left";
    btn.addEventListener("click", (e) => {
      for (const element of tabs.querySelectorAll("button")) {
        element.classList.remove("font-bold"); // barlıq buttonlardan active klassın óchirip qoyamız
      }
      e.target.classList.toggle("font-bold", true);

      // button basılǵanda, sol kategoriya sorawların kórsetemiz
      show_category(i);
      db.cat_index = i; // aktiv kategoriya indeksin saqlaymız
    });

    // del, kategoriyanı óchiretuǵın button qosamız
    const del_btn = document.createElement("button");
    del_btn.innerText = "d";
    del_btn.className = "text-white bg-red-500 w-8";
    del_btn.addEventListener("click", () => removeCategory(i));

    // tabsqa jaylastıramız
    div.appendChild(btn);
    div.appendChild(del_btn);
    tabs.appendChild(div);
  });
  show_category(null);
}
