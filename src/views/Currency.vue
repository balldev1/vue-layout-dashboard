<template>
  <div class="flex flex-col">
    <div
      :class="[
        isSidebarOpen ? 'pl-0' : 'pl-34',
        'transition-all duration-300 flex',
      ]"
    >
      <div
        v-if="!isSidebarOpen"
        class="w-full ml-auto flex justify-end items-center transition-all duration-300"
      >
        <ModalLogOut />
      </div>
    </div>
    <ContentCurrency />
  </div>
</template>

<script setup>
defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
});

import ModalLogOut from "@/components/Network/ModalLogOut.vue";
import ContentCurrency from "@/components/Currency/ContentCurrency.vue";
</script>
