/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
  // เพิ่มตัวแปรที่คุณใช้งานจากไฟล์ .env เช่น
  // VITE_OTHER_VARIABLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
