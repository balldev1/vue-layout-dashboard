<template>
  <div>
    <div class="text-4xl uppercase pb-4 pt-5">
      {{ $route.name }}
    </div>
    <div
      class="border-b-[1px] border-zinc-200 flex items-center justify-center"
    ></div>
    <CurrencyConverter />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import CurrencyConverter from "./CurrencyConverter.vue";

const route = useRoute();
</script>
