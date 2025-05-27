<script>
  import show_toast from "../funcs/show_toast";
  import db from "$lib/db";

  let fileInput;

  function cat_import(e) {
    const file = e.target.files[0];
    if (!file) {
      show_toast("Hesh qanday fayl tańlanbadı");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function (e) {
      const kategoriyalar = JSON.parse(e.target.result);
      clearFileInput();
      // await db.kategoriyalar.clear(); // Eski kategoriyalar óshiriledi
      await db.kategoriyalar.bulkAdd(kategoriyalar);
    };
    reader.onerror = function () {
      show_toast("Fayldı oqıwdıń ilaji bolmadı");
    };

    reader.readAsText(file);
  }

  function clearFileInput() {
    fileInput.value = "";
  }
</script>

<div>
  <label for="fileInput" class="block w-full rounded-md bg-blue-500 p-2 text-center text-white"
    >Import fayl</label
  >
  <input bind:this={fileInput} onchange={cat_import} type="file" id="fileInput" class="hidden" />
</div>
