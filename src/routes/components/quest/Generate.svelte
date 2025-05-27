<script>
  import { onDestroy, onMount } from "svelte";
  import db from "$lib/db";
  import { on } from "svelte/events";
  import { PFSHAA } from "../../funcs/PFSHAA";
  import { variantlar, variantlar_sani } from "../../store";
  import { initTemplates, template_full_func } from "./template";

  let P = [];

  const unsubscribe_variantlar_sani = variantlar.subscribe(async () => await prepare_pfshas());
  const unsubscribe_variant = variantlar.subscribe(async () => await prepare_pfshas());

  onDestroy(() => {
    unsubscribe_variantlar_sani;
    unsubscribe_variant();
  });

  async function prepare_pfshas() {
    try {
      const kategoriyalar = await db.kategoriyalar.toArray();
      const sorawlar = await db.sorawlar.toArray();

      P = sorawlar.map((soraw) => {
        const { count, kategoriyalarIds } = soraw;
        return {
          count: count,
          pfsha: new PFSHAA(
            kategoriyalarIds.map((id) => {
              const kategoriya = kategoriyalar.find((k) => k.name === id);
              return kategoriya ? kategoriya.sorawlar : [];
            })
          )
        };
      });
    } catch (e) {
      console.error("Error generating quest:", e);
    }
  }

  onMount(async () => {
    await prepare_pfshas();
    await initTemplates();
  });

  function make_one_variant() {
    let variant = [];
    P.forEach((p) => {
      variant = variant.concat(p.pfsha.next(p.count));
    });
    return variant;
  }

  async function generate() {
    let v = [];

    for (let i = 0; i < $variantlar_sani; i++) {
      v.push(make_one_variant());
    }

    variantlar.set(template_full_func(v));
  }
</script>

<button on:click={generate} class="rounded-md border border-green-500 p-2 text-xl">Generate</button>
