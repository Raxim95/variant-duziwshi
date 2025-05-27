<script>
  import db from "$lib/db.js";
  import { cat_id } from "../store";
  import { liveQuery } from "dexie";

  let kategoriyalar = liveQuery(() => db.kategoriyalar.toArray());

  function select_cat(id) {
    cat_id.set(id);
  }

  async function remove_cat(id) {
    await db.kategoriyalar.delete(id);
    cat_id.set(null);
  }
</script>

<div class="tabs flex flex-col gap-2" id="kategoriyalar">
  {#each $kategoriyalar as kategoriya}
    <div class="flex gap-2">
      <button
        onclick={() => select_cat(kategoriya.id)}
        class="grow border-b-1 text-left"
        class:font-bold={$cat_id === kategoriya.id}
      >
        {kategoriya.name}
      </button>
      <button onclick={() => remove_cat(kategoriya.id)} class="w-8 bg-red-500 text-white">
        d
      </button>
    </div>
  {/each}
</div>
