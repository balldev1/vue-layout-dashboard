<template>
  <div class="flex flex-col">
    <div
      :class="[
        isSidebarOpen ? 'pl-0' : 'pl-34',
        'transition-all duration-300 flex',
      ]"
    >
      <ModalAddContent />
      <div
        v-if="!isSidebarOpen"
        class="w-full ml-auto flex justify-end items-center transition-all duration-300"
      >
        <ModalLogOut />
      </div>
    </div>
    <ContentNetwork />
  </div>
</template>

<script setup>
defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
});

import ModalAddContent from "@/components/Network/ModalAddContent.vue";
import ModalLogOut from "@/components/Network/ModalLogOut.vue";
import ContentNetwork from "@/components/Network/ContentNetwork.vue";
</script>
