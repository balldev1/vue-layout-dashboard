import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
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

// เพิ่ม Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  // ถ้าหน้า route ต้องการการยืนยันตัวตน
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      // ตรวจสอบว่า cookie JWT มีอยู่หรือไม่
      const response = await axios.get(
        "http://localhost:5000/api/protected/profile",
        {
          withCredentials: true, // ส่ง cookie JWT
        }
      );

      if (response.data.user) {
        // ถ้ามีข้อมูลผู้ใช้, ให้ไปที่หน้า destination
        next();
      } else {
        // ถ้าไม่มี JWT หรือไม่ได้รับอนุญาต, ไปที่หน้า login
        next("/login");
      }
    } catch (error) {
      console.error("ไม่สามารถตรวจสอบข้อมูลโปรไฟล์ได้", error);
      next("/login"); // หากไม่สามารถเชื่อมต่อหรือเกิด error, ไปที่หน้า login
    }
  } else {
    // ถ้าไม่ต้องการการยืนยันตัวตน, ให้ไปหน้าต่อไป
    next();
  }
});

export default router;
