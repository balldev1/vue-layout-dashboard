// src/stores/currencyStore.ts
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";

export const useCurrencyStore = defineStore("currencyStore", () => {
  const fromCurrency = ref(localStorage.getItem("fromCurrency") || "USD");
  const toCurrency = ref(localStorage.getItem("toCurrency") || "THB");
  const amount = ref(Number(localStorage.getItem("amount") || 1));
  const rate = ref(Number(localStorage.getItem("rate") || 0));
  const convertedAmount = ref(localStorage.getItem("convertedAmount") || null);
  const currencies = [
    { label: "USD - United States Dollar", value: "USD", flag: "us" },
    { label: "THB - Thai Baht", value: "THB", flag: "th" },
    { label: "EUR - Euro", value: "EUR", flag: "eu" },
    { label: "JPY - Japanese Yen", value: "JPY", flag: "jp" },
    { label: "GBP - British Pound", value: "GBP", flag: "gb" },
  ];

  // ฟังก์ชันสำหรับเก็บข้อมูลลงใน localStorage เมื่อค่าเปลี่ยนแปลง
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  // ตรวจสอบและเก็บข้อมูลใน localStorage ทุกครั้งที่มีการเปลี่ยนแปลง
  watch(fromCurrency, (newValue) =>
    saveToLocalStorage("fromCurrency", newValue)
  );
  watch(toCurrency, (newValue) => saveToLocalStorage("toCurrency", newValue));
  watch(amount, (newValue) =>
    saveToLocalStorage("amount", newValue.toString())
  );
  watch(rate, (newValue) => saveToLocalStorage("rate", newValue.toString()));
  watch(convertedAmount, (newValue) =>
    saveToLocalStorage("convertedAmount", newValue || "")
  );

  // ฟังก์ชันอัปเดตอัตราแลกเปลี่ยนจาก API
  const updateRate = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/exchange-rate?from=${
          fromCurrency.value
        }&to=${toCurrency.value}`
      );
      rate.value = response.data.rate;
      saveToLocalStorage("rate", rate.value.toString()); // อัปเดต rate ใน localStorage
      console.log("test");
      // เรียกฟังก์ชัน convert เมื่ออัปเดต rate แล้ว
      convert();
    } catch (error) {
      console.error("Error updating exchange rate:", error);
    }
  };

  // ฟังก์ชันแปลงสกุลเงิน
  const convert = () => {
    if (rate.value) {
      convertedAmount.value = (amount.value * rate.value).toFixed(2);
      saveToLocalStorage("convertedAmount", convertedAmount.value); // อัปเดต convertedAmount ใน localStorage
    } else {
      console.error(
        "Rate not available. Please update the exchange rate first."
      );
    }
  };

  return {
    fromCurrency,
    toCurrency,
    amount,
    rate,
    convertedAmount,
    currencies,
    updateRate,
    convert,
  };
});
