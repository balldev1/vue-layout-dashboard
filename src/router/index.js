import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Network from "../views/Network.vue";
import NotFound from "../views/NotFound.vue";
import axios from "axios";

// Define routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }, // ต้องการการยืนยันตัวตน
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { requiresAuth: true }, // ต้องการการยืนยันตัวตน
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false }, // ไม่ต้องการการยืนยันตัวตน
  },
  {
    path: "/network",
    name: "Network",
    component: Network,
    meta: { requiresAuth: true }, // ไม่ต้องการการยืนยันตัวตน
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { requiresAuth: true }, // ต้องการการยืนยันตัวตน
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// เพิ่ม Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile`, // เรียก API เพื่อตรวจสอบ JWT
        {
          withCredentials: true,
        }
      );

      // ตรวจสอบว่า response.ok เป็น true หรือไม่
      if (response.status === 200) {
        // ถ้าสถานะเป็น 200 OK
        next();
      }
    } catch (error) {
      console.error("ไม่สามารถตรวจสอบข้อมูลโปรไฟล์ได้", error);
      next("/login"); // หากไม่สามารถเชื่อมต่อหรือเกิด error, ไปที่หน้า login
    }
  } else {
    next(); // ถ้าไม่ต้องการการยืนยันตัวตน, ไปที่หน้าต่อไป
  }
});

export default router;
