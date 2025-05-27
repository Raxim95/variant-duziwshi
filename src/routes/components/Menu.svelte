<script>
  import { menu } from "../store";
  function event(e) {
    show(e.target.innerText);
    menu.set(e.target.innerText.toLowerCase());
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
</script>

<div id="menu" class="w-[200px] bg-gray-200 p-4">
  <h3 class="text-center text-2xl">Menu</h3>
  <div class="tabs flex flex-col">
    <button class:font-bold={$menu === "kategoriyalar"} onclick={event}>kategoriyalar</button>
    <button class:font-bold={$menu === "sorawlar"} onclick={event}>sorawlar</button>
  </div>
</div>
