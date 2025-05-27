<script>
  import CatAdd from "./components/CatAdd.svelte";
  import CatImport from "./components/CatImport.svelte";
  import CatTabs from "./components/CatTabs.svelte";
  import Content from "./components/Content.svelte";
  import Menu from "./components/Menu.svelte";

  import cat_load_default from "$lib/cat_load_default";
  import CatClear from "./components/CatClear.svelte";
  import QuestList from "./components/quest/QuestList.svelte";
  import QuestAdd from "./components/quest/QuestAdd.svelte";
</script>

<div id="con" class="flex h-[100vh] w-[100vw]">
  <Menu />

  <div id="main" class="grow">
    <div id="kategoriyalar" class="flex h-full">
      <div class="mt-8 flex w-[400px] flex-col gap-6 p-4">
        <CatTabs />
        <CatAdd />
        <CatClear />
        <CatImport />
      </div>
      <Content />
    </div>
    <div id="sorawlar" class="hidden h-full gap-8 p-4">
      <QuestList></QuestList>
      <QuestAdd></QuestAdd>
    </div>
  </div>
</div>
