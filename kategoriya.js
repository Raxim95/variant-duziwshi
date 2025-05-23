let kategoriyalar = [
  {
    name: "A",
    sorawlar: ["a1", "a2", "a3", "a4"],
  },
  {
    name: "B",
    sorawlar: ["b1", "b2", "b3", "b4"],
  },
  {
    name: "C",
    sorawlar: ["c1", "c2", "c3", "c4"],
  },
  {
    name: "D",
    sorawlar: ["d1", "d2", "d3", "d4"],
  },
];

// id="kategoriya" bolǵan elementti toltıramız
function fill_tabs() {
  const tabs = document.querySelector("#kategoriyalar .tabs");
  kategoriyalar.forEach((v) => {
    // knopkalar turatuǵın div
    const div = document.createElement("div");
    div.className = "flex gap-2";
    // tabsqa button (kategoriya) qosamız
    const btn = document.createElement("button");
    btn.innerText = v.name;
    btn.className = "cursor-pointer w-4 text-white bg-blue-500 rounded-md font-bold w-[80%]";
    btn.addEventListener("click", () => show_category(v.name));
    // kategoriyanı óchiretuǵın button qosamız
    const del_btn = document.createElement("button");
    del_btn.innerText = "d";
    del_btn.className = "cursor-pointer w-4 text-white bg-red-500 rounded-md w-[20%]";
    del_btn.addEventListener("click", removeCategory(v.name));

    // tabsqa jaylastıramız
    div.appendChild(btn);
    div.appendChild(del_btn);
    tabs.appendChild(div);
  });
}

// 94 453 11 92

function show_category(name) {
  const content_area = document.querySelector("#kategoriyalar .content");
  content_area.value = "";
  kategoriyalar.forEach((v, i) => {
    if (v.name === name) {
      content_area.value = kategoriyalar[i].sorawlar.join("\n");
    }
  });
}

function removeCategory(name) {
  kategoriyalar = kategoriyalar.filter((v) => name !== v.name);
}
