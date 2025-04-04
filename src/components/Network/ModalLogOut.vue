<template>
  <button class="btn w-32 mx-auto" onclick="Logout_1.showModal()">
    Log out
  </button>
  <dialog id="Logout_1" class="modal">
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
          <button class="btn bg-zinc-700">Confirm</button>
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
import { ref } from "vue";
import axios from "axios";

const headerValue = ref("");
const contentValue = ref("");
const imageValue = ref(null);

const handleConfirm = async () => {
  const formData = new FormData();
  formData.append("header", headerValue.value);
  formData.append("content", contentValue.value);

  // ตรวจสอบว่าไฟล์อัพโหลดมีหรือไม่
  if (imageValue.value && imageValue.value.files.length > 0) {
    const file = imageValue.value.files[0]; // กำหนดตัวแปร file จากไฟล์ที่เลือก
    formData.append("image", file);
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/network`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Post created:", response.data);
  } catch (error) {
    console.error("Error creating post:", error);
  }
};
</script>
