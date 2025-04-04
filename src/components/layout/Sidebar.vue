<template>
  <aside class="flex flex-col h-screen">
    <!-- Sidebar -->
    <RouterLink
      v-for="item in menu"
      :key="item.name"
      :to="item.path"
      class="py-2 px-3 rounded hover:bg-rose-600 transition"
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
