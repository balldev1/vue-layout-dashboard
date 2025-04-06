<template>
  <div
    class="hero bg-zinc-500 min-h-screen"
    :style="{
      'background-image':
        'url(https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
    }"
  >
    <div class="flex flex-col">
      <div class="flex gap-5 shadow-sm p-4">
        <fieldset
          class="fieldset w-xs p-5 rounded-sm bg-gradient-to-r from-zinc-100/40 to-zinc-10"
        >
          <div class="flex flex-col items-center justify-center">
            <img
              src="/food_logo.png"
              alt="Background Image"
              class="w-full h-64 object-cover"
            />
          </div>
          <div class="space-y-5 pb-4 flex flex-col gap-3">
            <input
              @keyup.enter="login"
              v-model="email"
              type="email"
              class="input bg-white text-zinc-950 placeholder:text-sm shadow-sm shadow-zinc-950 focus:outline-none focus:shadow-sm focus:shadow-zinc-950"
              placeholder="Email"
            />
            <input
              @keyup.enter="login"
              v-model="password"
              type="password"
              class="input bg-white text-zinc-950 placeholder:text-sm shadow-sm shadow-zinc-950 focus:outline-none focus:shadow-sm focus:shadow-zinc-950"
              placeholder="Password"
            />
          </div>
          <button
            @click="login"
            class="btn bg-gradient-to-r from-sky-950 to-sky-900 border-none rounded-sm shadow-sm shadow-zinc-100 uppercase"
          >
            Login
          </button>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const email = ref("");
const password = ref("");
const router = useRouter();

// ดึงค่าจาก .env

const login = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login`,
      {
        email: email.value,
        password: password.value,
      },
      { withCredentials: true }
    );
    router.push("/");
  } catch (error) {
    console.error(
      "Login Failed:",
      error.response?.data?.message || error.message
    );
    errorMessage.value = error.response?.data?.message || "Login failed!";
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/profile`, // เรียก API เพื่อตรวจสอบ JWT
      {
        withCredentials: true,
      }
    );
    // ตรวจสอบว่า response.status เป็น 200 หรือไม่
    if (response.status === 200) {
      router.push("/");
    }
  } catch (error) {
    console.error("Error during profile check:", error);
    router.push("/login");
  }
});
</script>
