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
              @keyup.enter="Handlelogin"
              v-model="email"
              type="email"
              class="input bg-white text-zinc-950 placeholder:text-sm shadow-sm shadow-zinc-950 focus:outline-none focus:shadow-sm focus:shadow-zinc-950"
              placeholder="Email"
            />
            <input
              @keyup.enter="Handlelogin"
              v-model="password"
              type="password"
              class="input bg-white text-zinc-950 placeholder:text-sm shadow-sm shadow-zinc-950 focus:outline-none focus:shadow-sm focus:shadow-zinc-950"
              placeholder="Password"
            />
          </div>
          <button
            @click="Handlelogin"
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
import Swal from "sweetalert2";
const email = ref("");
const password = ref("");
const router = useRouter();

// เพิ่มตัวแปรนับรอบผิด
const loginAttempts = ref(0);
const lockUntil = ref(null);

const Handlelogin = async () => {
  const now = new Date();

  // 🔒 ถ้ายังไม่หมดเวลา lock
  if (lockUntil.value && now < lockUntil.value) {
    const secondsLeft = Math.ceil((lockUntil.value - now) / 1000);
    Swal.fire({
      icon: "warning",
      title: "ถูกล็อคชั่วคราว",
      text: `กรุณารออีก ${secondsLeft} วินาที แล้วลองใหม่`,
    });
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login`,
      {
        email: email.value,
        password: password.value,
      },
      { withCredentials: true }
    );

    // ✅ สำเร็จ
    loginAttempts.value = 0;
    lockUntil.value = null;

    Swal.fire({
      icon: "success",
      title: "เข้าสู่ระบบสำเร็จ",
      showConfirmButton: false,
      timer: 1500,
    });

    router.push("/");
  } catch (error) {
    // ❌ ล้มเหลว
    loginAttempts.value++;

    const attemptsLeft = 3 - loginAttempts.value;

    if (loginAttempts.value >= 3) {
      lockUntil.value = new Date(Date.now() + 60 * 1000); // ล็อค 1 นาที
      Swal.fire({
        icon: "error",
        title: "ล็อคระบบ!",
        text: "คุณกรอกรหัสผิดเกิน 3 ครั้ง กรุณารอ 1 นาทีแล้วลองใหม่",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบล้มเหลว",
        html: `คุณกรอกรหัสผิดไปแล้ว <b>${loginAttempts.value}</b> ครั้ง<br>เหลืออีก <b>${attemptsLeft}</b> ครั้งก่อนระบบจะล็อค 1 นาที`,
      });
    }
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/profile`,
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
