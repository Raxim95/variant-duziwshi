<script>
  import db from "$lib/db";

  async function cat_clear() {
    await db.kategoriyalar.clear();
  }
</script>

<button class="rounded-md border p-2 text-red-500" onclick={cat_clear}>Tazalaw</button>
