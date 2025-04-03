<script setup lang="ts">
import { useRoute } from "vue-router"; // ใช้ useRoute เพื่อเช็ค path ปัจจุบัน
import Navbar from "./components/layout/Navbar.vue";
const route = useRoute(); // รับข้อมูล path ปัจจุบันจาก Vue Router
</script>

<template>
  <div v-if="route.path !== '/login'" class="text-black w-full min-h-screen">
    <!-- Navbar (Fixed) -->
    <div class="fixed w-full top-0 z-50">
      <Navbar />
    </div>
    <!-- sizebar -->
    <div
      class="h-full bg-zinc-100 fixed w-40 z-40 pt-20 shadow-sm shadow-gray-500"
    >
      sidebar
    </div>
    <!-- content -->
    <div class="pl-40 pt-14">
      <div class="bg-white text-lime-500 p-5 min-h-screen">
        <div class="bg-slate-950 min-h-screen">
          <RouterView />
        </div>
      </div>
    </div>
    <!-- footer -->
    <footer
      class="bg-zinc-100 shadow-sm shadow-gray-500 fixed bottom-0 w-full z-40 p-2 text-center"
    >
      Copyright © 2024 - Balldev1 Co., Ltd
    </footer>
  </div>
  <!-- login -->
  <div v-else>
    <RouterView />
  </div>
</template>
