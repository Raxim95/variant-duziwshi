<script>
  import db from "$lib/db.js";
  import { liveQuery } from "dexie";
  import show_toast from "../../funcs/show_toast";

  let kategoriyalarIds = [];
  $: max_count = kategoriyalarIds.length;
  let kategoriyalar = liveQuery(() => db.kategoriyalar.toArray());
  let count = 1;

  async function quest_add() {
    if (kategoriyalarIds.length === 0) {
      show_toast("Kategoriyalardı tanlań!");
      return;
    }

    try {
      await db.sorawlar.add({
        name: kategoriyalarIds.join(", "),
        count,
        kategoriyalarIds: kategoriyalarIds
      });
      show_toast("Soraw qosıldı!");
    } catch (err) {
      console.error("Qátelik: ", err);
      show_toast("Soraw qosıwda qátelik júz berdi!");
    }
  }
</script>

<div class="flex w-[50%] flex-col gap-4">
  <div class="cats flex flex-col gap-4 overflow-y-auto">
    {#each $kategoriyalar as kategoriya}
      <div class="flex gap-2">
        <label class="grow">
          <input
            type="checkbox"
            bind:group={kategoriyalarIds}
            value={kategoriya.name + ""}
            class="mr-2"
          />
          {kategoriya.name}
        </label>
      </div>
    {/each}
  </div>
  <div class="mt-8">
    <span>Sorawlar sanı (1-{max_count}): </span>
    <input
      type="number"
      placeholder="Max soraw sanı 1-{max_count}."
      title="Max soraw sanı 1-{max_count}."
      min="1"
      max={max_count}
      bind:value={count}
      class="m-2 rounded-md border p-2"
    />
    <br />
    <button
      disabled={kategoriyalarIds.length === 0}
      onclick={() => (kategoriyalarIds.length = 0)}
      class="mt-4 w-full rounded-md border border-red-500 p-2">Clear</button
    >
    <button onclick={quest_add} class="mt-4 w-full rounded-md border p-2">Add</button>
  </div>
</div>
