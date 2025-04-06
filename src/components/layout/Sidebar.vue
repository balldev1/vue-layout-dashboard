<template>
  <aside class="flex flex-col h-screen border-b-2">
    <RouterLink
      v-for="item in menu"
      :key="item.name"
      :to="item.path"
      :class="[
        'py-2 px-5 transition border-b-2 border-zinc-500 border-dotted hover:bg-gradient-to-r from-zinc-900 to-zinc-600/70 hover:text-white',
        $route.path === item.path
          ? 'bg-gradient-to-r from-zinc-900 to-zinc-600/70  text-white '
          : 'text-zinc-950',
      ]"
    >
      {{ item.name }}
    </RouterLink>
  </aside>
</template>

<script setup>
const menu = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Network", path: "/network" },
];
</script>
