<template>
  <div class="flex flex-col">
    <div
      :class="[
        isSidebarOpen ? 'pl-0 ' : 'pl-34',
        'transition-all duration-300 flex',
      ]"
    >
      <div
        :class="[
          isSidebarOpen ? 'pt-5 ' : 'pt-0',
          'transition-all duration-300 flex',
        ]"
      >
        <ModalAddContent />
      </div>
      <div
        v-if="!isSidebarOpen"
        class="w-full ml-auto flex justify-end items-center transition-all duration-300"
      >
        <ModalLogOut />
      </div>
    </div>
    <div
      :class="[
        isSidebarOpen ? 'pt-10' : 'pt-5 ',
        'transition-all duration-300  flex items-center justify-center ',
      ]"
    >
      <ContentProGramMer />
    </div>
  </div>
</template>

<script setup>
defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
});

import ModalAddContent from "@/components/ProGramMer/ModalAddContent.vue";
import ModalLogOut from "@/components/ProGramMer/ModalLogOut.vue";
import ContentProGramMer from "@/components/ProGramMer/ContentProGramMer.vue";
</script>
