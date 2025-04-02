<template>
  <div class="w-full bg-zinc-100 shadow-sm shadow-gray-500 p-5">
    <div class="flex items-center justify-between">
      <!-- Home Link -->
      <RouterLink :to="'/'" class="hover:text-lime-500 font-semibold">
        Home
      </RouterLink>

      <!-- Navigation Links -->
      <div class="flex gap-5">
        <RouterLink :to="'/about'" class="hover:text-lime-500"
          >About</RouterLink
        >
        <RouterLink :to="'/about2'" class="hover:text-lime-500"
          >About2</RouterLink
        >
      </div>

      <!-- Logout -->
      <div class="cursor-pointer hover:text-red-500">Logout</div>
    </div>
  </div>
</template>
