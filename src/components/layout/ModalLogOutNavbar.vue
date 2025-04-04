<template>
  <button class="btn mx-auto" onclick="Logout_2.showModal()">Log out</button>
  <dialog id="Logout_2" class="modal">
    <div
      class="modal-box text-white text-center flex flex-col items-center justify-center gap-5 bg-zinc-500/10 w-96"
    >
      <h3
        class="text-2xl font-bold bg-gradient-to-r from-zinc-950/90 to-zinc-800/70 shadow-sm shadow-zinc-950 py-2 w-full rounded-full"
      >
        Hello! are you sure logout ?
      </h3>
      <img
        src="/food_logo.png"
        alt="Background Image"
        class="w-42 h-42 object-cover rounded-full bg-zinc-200 shadow-sm shadow-zinc-950"
      />
      <div class="flex items-cnter justify-center gap-2 w-full">
        <div>
          <button @click="handleLogout" class="btn bg-zinc-700">Confirm</button>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn bg-zinc-700">Close</button>
          </form>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();

const handleLogout = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/logout`,
      {},
      { withCredentials: true }
    );
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>
