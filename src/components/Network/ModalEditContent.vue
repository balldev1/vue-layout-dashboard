<template>
  <!-- ปุ่มเปิด Modal -->
  <button class="btn" @click="openModal">Edit</button>

  <!-- Modal -->
  <dialog ref="modalRef" id="Edit_1" class="modal">
    <div class="modal-box text-white">
      <h3 class="text-lg font-bold">Hello! What you Edit Network Today</h3>
      <div class="py-4 flex flex-col gap-4">
        <!-- header -->
        <input
          v-model="headerValue"
          type="text"
          placeholder="header"
          class="input focus:outline-none w-full border-zinc-50/50 focus:border-zinc-100"
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
        <div class="flex items-center justify-center relative">
          <button
            class="absolute hover:cursor-pointer top-[-10px] right-36 uppercase rounded-sm px-2 border-2 bg-red-600 flex items-center justify-center"
          >
            x
          </button>
          <img
            :src="`http://localhost:5555${post.image}`"
            alt="NetworkImage"
            class="w-36 h-36"
          />
        </div>
        <!-- <div v-else>
          <fieldset class="fieldset">
            <input
              ref="imageValue"
              type="file"
              class="file-input focus:outline-none border-zinc-50/50"
            />
          </fieldset>
        </div> -->
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
import { defineProps } from "vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const modalRef = ref(null);
const headerValue = ref("");
const contentValue = ref("");

// ฟังก์ชันเปิด modal
const openModal = () => {
  if (modalRef.value) {
    modalRef.value.showModal();
    headerValue.value = props.post.header;
    contentValue.value = props.post.content;
  }
};
</script>
