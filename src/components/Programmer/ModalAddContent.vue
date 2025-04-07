<template>
  <button class="btn w-32 mx-auto" onclick="Add_Content.showModal()">
    Add Content
  </button>
  <dialog id="Add_Content" class="modal">
    <div class="modal-box text-white">
      <h3 class="text-lg font-bold">Hello! What you learn Programmer Today</h3>
      <div class="py-4 flex flex-col gap-4">
        <!-- header -->
        <input
          v-model="headerValue"
          type="text"
          placeholder="header"
          className="input focus:outline-none w-full border-zinc-50/50 focus:border-zinc-100"
        />
        <!-- content -->
        <fieldset className="fieldset ">
          <textarea
            v-model="contentValue"
            className="textarea  h-40 w-full focus:outline-none  shadow-sm 
            focus:border-[1px] focus:border-zinc-100  border-zinc-50/50
            "
            placeholder="Content"
          ></textarea>
        </fieldset>
        <!-- upload -->
        <fieldset class="fieldset">
          <input
            ref="imageValue"
            type="file"
            class="file-input focus:outline-none border-zinc-50/50"
          />
        </fieldset>
      </div>
      <div class="flex items-cnter justify-end gap-2 w-full">
        <div>
          <button @click="handleConfirm" class="btn bg-zinc-700">
            Confirm
          </button>
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
      `${import.meta.env.VITE_API_BASE_URL}/programmer`,
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
