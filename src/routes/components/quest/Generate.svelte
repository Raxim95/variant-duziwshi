<script>
  import db from "$lib/db";
  import { on } from "svelte/events";
  import { PFSHAA } from "../../funcs/PFSHAA";
  import { variantlar, variantlar_sani } from "../../store";
  import { onMount } from "svelte";

  let P = [];

  async function prepare_pfshas() {
    try {
      const kategoriyalar = await db.kategoriyalar.toArray();
      const sorawlar = await db.sorawlar.toArray();

      console.log(sorawlar, kategoriyalar);

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
  });

  function make_one_variant() {
    let variant = [];
    P.forEach((p) => {
      variant = variant.concat(p.pfsha.next(p.count));
    });
    return variant;
  }

  function generate() {
    console.log(P);

    let v = [];

    for (let i = 0; i < $variantlar_sani; i++) {
      v.push(make_one_variant());
    }

    variantlar.set(v);
  }
</script>

<button on:click={generate} class="rounded-md border border-green-500 p-2 text-xl">Generate</button>
