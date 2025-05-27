<script>
  import show_toast from "../funcs/show_toast.js";
  import db from "$lib/db.js";

  async function add_cat() {
    const input = document.getElementById("new_cat_input");
    const cat_name = input.value.trim();
    if (cat_name === "") {
      show_toast("Kategoriyanıń atın kiritiń!");
      return;
    }

    if (cat_name) {
      const existingCat = await db.kategoriyalar.where("name").equals(cat_name).first();
      if (existingCat) {
        show_toast("Bul kategoriya bar, basqa at kiritiń!");
        input.value = ""; // input polyasın bosatamız
        return;
      }
      await db.kategoriyalar.add({ name: cat_name, sorawlar: [] });
      input.value = ""; // input polyasın bosatamız
    }
  }
</script>

<div class="flex gap-2">
  <input
    onkeydown={async (e) => {
      if (e.key === "Enter") await add_cat();
    }}
    type="text"
    id="new_cat_input"
    class="grow border p-2"
    placeholder="taza kategoriyanıń atı"
  />
  <button
    onclick={async () => await add_cat()}
    id="new_cat_btn"
    class="w-8 rounded-md bg-green-500 text-white">+</button
  >
</div>
