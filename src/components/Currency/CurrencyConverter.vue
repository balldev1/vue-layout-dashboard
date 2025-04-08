<template>
  <div class="shadow-md shadow-gray-200 rounded-md bg-white">
    <div class="p-5 border-b-[1px] border-gray-200">
      <h1 class="text-2xl font-bold">Currency Converterad</h1>
    </div>
    <div class="p-5">
      <div class="flex items-center gap-5">
        <div class="">
          <h1 class="text-sm text-orange-600 bg-orange-100 p-2 rounded-full">
            {{ currencyStore.amount }}
            {{ currencyStore.fromCurrency }} =
            {{ currencyStore.convertedAmount }}
            {{ currencyStore.toCurrency }}
          </h1>
        </div>
        <button
          @click="currencyStore.updateRate"
          class="bg-gradient-to-t from-orange-500 to-orange-300 border-none btn rounded-m text-white px-4 p-2 shadow-sm shadow-zinc-300 text-sm"
        >
          🔄 Update Rate
        </button>
      </div>

      <div class="flex gap-5 items-center pt-5">
        <div class="flex-col flex gap-2">
          <h1 class="text-sm">Amount</h1>
          <div class="relative flex items-center">
            <div>
              <input
                type="number"
                v-model="currencyStore.amount"
                placeholder="Amount"
                class="border bg-white rounded-lg shadow-gray-500 px-4 py-4 w-80 shadow-sm border-none focus:outline-none"
              />
            </div>
            <div class="absolute z-50 right-1 bg-white">
              <Dropdown
                v-model="currencyStore.fromCurrency"
                :options="currencyStore.currencies"
                optionLabel="label"
                optionValue="value"
                filter
                placeholder="Select Currency"
                class="!border-none !focus:outline-none"
              >
                <!-- ค่าเงินที่ให้เลือก -->
                <template #option="slotProps">
                  <div class="flex items-center gap-2">
                    <img
                      :src="`https://flagcdn.com/w40/${slotProps.option.flag}.png`"
                      class="w-5 h-4 object-cover rounded-sm"
                    />
                    <span>{{ slotProps.option.label }}</span>
                  </div>
                </template>
                <!-- ค่าเงินที่แสดง -->
                <template #value="slotProps">
                  <div class="flex items-center gap-2">
                    <img
                      v-if="slotProps.value"
                      :src="`https://flagcdn.com/w40/${
                        currencyStore.currencies.find(
                          (c) => c.value === slotProps.value
                        )?.flag
                      }.png`"
                      class="w-5 h-4 object-cover rounded-sm"
                    />
                    <span>
                      {{
                        currencyStore.currencies.find(
                          (c) => c.value === slotProps.value
                        )?.value
                      }}
                    </span>
                  </div>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>

        <div
          class="text-sm px-2 mt-10 bg-white rounded-full h-8 w-8 shadow-sm shadow-gray-950 flex items-center justify-center"
        >
          <span> ⇄ </span>
        </div>

        <div class="flex-col flex gap-2">
          <h1 class="text-sm">Converted to</h1>
          <div class="relative flex items-center">
            <div
              class="border rounded-lg shadow-gray-500 px-4 py-4 w-80 shadow-sm appearance-none border-none focus:outline-none"
            >
              <span class="font-medium">{{ currencyStore.rate }}</span>
            </div>
            <div class="absolute z-50 right-2 bg-white">
              <Dropdown
                v-model="currencyStore.toCurrency"
                :options="currencyStore.currencies"
                optionLabel="value"
                optionValue="value"
                filter
                class="!border-none !focus:outline-none"
                placeholder="Select Currency"
              >
                <!-- ค่าเงินที่ให้เลือก -->
                <template #option="slotProps">
                  <div class="flex items-center gap-2">
                    <img
                      :src="`https://flagcdn.com/w40/${slotProps.option.flag}.png`"
                      class="w-5 h-4 object-cover rounded-sm"
                    />
                    <span>{{ slotProps.option.label }}</span>
                  </div>
                </template>

                <!-- ค่าเงินที่แสดงในช่อง dropdown -->
                <template #value="slotProps">
                  <div class="flex items-center gap-2">
                    <img
                      v-if="slotProps.value"
                      :src="`https://flagcdn.com/w40/${
                        currencyStore.currencies.find(
                          (c) => c.value === slotProps.value
                        )?.flag
                      }.png`"
                      class="w-5 h-4 object-cover rounded-sm"
                    />
                    <span>
                      {{
                        currencyStore.currencies.find(
                          (c) => c.value === slotProps.value
                        )?.value
                      }}
                    </span>
                  </div>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCurrencyStore } from "../../stores/currencyStore";
import Dropdown from "primevue/dropdown";

const currencyStore = useCurrencyStore();
</script>
