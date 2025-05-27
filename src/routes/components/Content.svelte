<script>
  import show_toast from "../funcs/show_toast";
  import { cat_id } from "../store";
  import db from "$lib/db.js";
  import { liveQuery } from "dexie";
  import { derived } from "svelte/store";
  import { onDestroy } from "svelte";
  import { on } from "svelte/events";

  let kategoriya = null;
  let title = null;
  let content = null;

  // cat_id ni o‘qib, unga mos kategoriya ni olib kelamiz
  const unsubscribe = cat_id.subscribe(async (id) => {
    if (id === null) {
      title = null;
      content = null;
      return;
    }
    try {
      kategoriya = await db.kategoriyalar.get(id);
      title = kategoriya?.name;
      content = kategoriya?.sorawlar.join("\n") || "";
    } catch (err) {
      console.error("Xatolik:", err);
    }
  });

  onDestroy(() => {
    unsubscribe();
  });

  async function save(e) {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      const current = $cat_id;
      if (current === null) {
        show_toast("Kategoriyanı tańlań!");
        return;
      }

      try {
        await db.kategoriyalar.update(current, {
          sorawlar: content.split("\n")
        });
        show_toast("Sorawlar saqlandı!");
      } catch (err) {
        show_toast("Xatolik yuz berdi!");
        console.error("Update error:", err);
      }
    }
  }
</script>

<div class="flex grow flex-col p-4">
  <h3 id="cat_title" class="h-8 p-2">{title}</h3>
  <textarea
    on:keydown={save}
    class="content w-full grow border p-2"
    bind:value={content}
    placeholder="Sorawlar dizimi"
  ></textarea>
</div>
