<template>
  <div
    v-if="route.path !== '/login' && user"
    class="text-black w-full min-h-screen"
  >
    <!-- Navbar (Fixed) -->
    <div v-if="isSidebarOpen" class="fixed w-full top-0 z-40">
      <Navbar />
    </div>
    <!-- sizebar -->
    <div class="relative z-50">
      <!-- ปุ่ม Toggle -->
      <button
        @click="isSidebarOpen = !isSidebarOpen"
        class="fixed top-5 left-5 bg-zinc-800 z-50 text-white rounded-md shadow btn"
      >
        {{ isSidebarOpen ? "Close" : "Open" }}
      </button>
      <!-- Sidebar -->
      <div
        v-if="isSidebarOpen"
        class="h-full bg-zinc-100 fixed w-40 pt-20 shadow-sm shadow-gray-500 transition-all duration-300"
      >
        <Sidebar />
      </div>
    </div>
    <!-- content -->
    <div
      :class="[
        isSidebarOpen ? 'pl-40 pt-14' : 'p-0',
        ' transition-all duration-300',
      ]"
    >
      <div class="bg-white p-5 min-h-screen">
        <div class="min-h-screen">
          <RouterView :isSidebarOpen="isSidebarOpen" />
        </div>
      </div>
    </div>
    <!-- footer -->
    <footer
      v-if="isSidebarOpen"
      class="bg-zinc-100 shadow-sm shadow-gray-500 fixed bottom-0 w-full z-40 p-2 text-center"
    >
      footer
    </footer>
  </div>
  <!-- login -->
  <div v-else>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router"; // ใช้ useRoute เพื่อเช็ค path ปัจจุบัน
import axios from "axios";
import Navbar from "./components/layout/Navbar.vue";
import Sidebar from "./components/layout/Sidebar.vue";
const route = useRoute(); // รับข้อมูล path ปัจจุบันจาก Vue Router

const sidebarState = localStorage.getItem("isSidebarOpen");
const isSidebarOpen = ref(
  sidebarState !== null ? sidebarState === "true" : true
);

// สร้างตัวแปรที่จะเก็บข้อมูล user
const user = ref(null);
// ฟังก์ชันในการดึงข้อมูลจาก API
const fetchProfile = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/profile`,
      {
        withCredentials: true,
      }
    );
    user.value = response.data.user; // กำหนดค่าให้ user
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};
console.log(user);

// ดึงข้อมูลเมื่อ component ถูก mount
onMounted(() => {
  fetchProfile();
});

// ทุกครั้งที่มีการเปลี่ยนแปลง isSidebarOpen ให้ sync ไปเก็บใน localStorage
watch(isSidebarOpen, (newVal) => {
  localStorage.setItem("isSidebarOpen", newVal.toString());
});
</script>
