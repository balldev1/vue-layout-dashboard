<template>
  <div class="w-full bg-zinc-100 shadow-sm shadow-gray-500 py-2 pr-5">
    <div class="flex items-center justify-between">
      <!-- Home Link -->
      <RouterLink to="/" class="hover:text-lime-500 font-semibold">
        Home
      </RouterLink>

      <!-- Navigation + Logout -->
      <div class="flex gap-2 items-center">
        <!-- Navigation Links -->
        <div class="flex gap-5">
          <RouterLink
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="hover:text-lime-500"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <!-- Divider -->
        <span>|</span>

        <!-- Logout -->
        <ModalLogOutNavbar />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import ModalLogOutNavbar from "@/components/layout/ModalLogOutNavbar.vue";

const links = [
  { name: "About", path: "/about" },
  { name: "Docs", path: "/docs" },
  { name: "API", path: "/api" },
  { name: "Playground", path: "/playground" },
  { name: "Ecosystem", path: "/ecosystem" },
];

const router = useRouter();

const logout = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/logout`,
      {},
      { withCredentials: true } // สำคัญมากถ้าใช้ cookie สำหรับ session
    );
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>
