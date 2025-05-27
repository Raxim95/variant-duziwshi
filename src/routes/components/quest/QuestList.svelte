<script>
  import db from "$lib/db.js";
  import { liveQuery } from "dexie";
  import show_toast from "../../funcs/show_toast";

  let sorawlar = liveQuery(() => db.sorawlar.toArray());
  $: summ = $sorawlar?.reduce((acc, soraw) => acc + soraw.count, 0);
  let variant_sani = 50;

  function generate() {
    show_toast("Generate basıldı!: " + variant_sani);
  }
</script>

<div class="flex w-[50%] flex-col gap-8 overflow-auto border-r-1 p-4">
  {#each $sorawlar as soraw}
    <div class="flex items-center gap-4">
      <span class="grow border-b border-gray-400">{soraw.name}</span>
      <span
        class="flex h-6 w-6 items-center justify-center rounded-md bg-gray-500 font-bold text-white"
        >{soraw.count}</span
      >
      <button
        class="ml-auto rounded-md bg-red-500 px-2 text-white"
        onclick={() => db.sorawlar.delete(soraw.id)}
      >
        d
      </button>
    </div>
  {/each}
  <div class="text-xl">
    {"Bir variantta Jámi: "}<strong>{summ}</strong>{" soraw boladı."}
  </div>
  <div>
    {"Neshe variant kerek boladı? (1-200)"}
    <input
      type="number"
      name=""
      bind:value={variant_sani}
      min="1"
      max="200"
      class="ml-2 rounded-md border p-2"
      title="Neshe variant kerek boladı? (1-200)"
    />
  </div>
  <div class="flex flex-col gap-2">
    <button onclick={() => db.sorawlar.clear()} class="rounded-md border border-red-500 p-2 text-xl"
      >Clear</button
    >
    <button onclick={generate} class="rounded-md border border-green-500 p-2 text-xl"
      >Generate</button
    >
  </div>
</div>
